from rest_framework import status
from datetime import datetime
from .models import hotel_collection, room_collection
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
import requests

class getSearchInfo(APIView):
    def get(self, request):
        try:
            areas = list(hotel_collection.distinct("Area"))
            customerCounts = [1, 2, 3, 4]
            data = {
                "areas": areas,
                "customerCounts": customerCounts
            }
            response = Response(data, status=status.HTTP_200_OK)
            response['Content-Type'] = 'application/json; charset=utf-8'
            # print(areas)
            return response
        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "Failed to get search info."}, status=status.HTTP_400_BAD_REQUEST)
        
# class getHotels(APIView):
#     def get(self, request):
#         try:
#             area = request.query_params.get('area')
#             print(area)
#             hotels = list(hotel_collection.find({
#                 "Area": area,
#             }))

#             for hotel in hotels:
#                 hotel['_id'] = str(hotel['_id'])  # Convert ObjectId to string

#             response = {"hotels": hotels}
#             return Response(response, status=status.HTTP_200_OK)
#         except Exception as e:
#             print(f"Error: {e}")
#             return Response({"message": "Failed to get hotels."}, status=status.HTTP_400_BAD_REQUEST)


class getHotels(APIView):
    def get(self, request):
        try:
            area = request.query_params.get('area')
            offset = int(request.query_params.get('offset', 0))  # Default to 0 if not provided
            limit = int(request.query_params.get('limit', 5))  # Default to 5 if not provided

            # Find hotels by area, with pagination
            hotels = list(hotel_collection.find({
                "Area": area,
            }).limit(offset+limit))  # Apply skip and limit for pagination

            # Convert ObjectId to string for each hotel
            for hotel in hotels:
                hotel['_id'] = str(hotel['_id'])

            response = {
                "hotels": hotels
            }

            return Response(response, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "Failed to get hotels."}, status=status.HTTP_400_BAD_REQUEST)


def is_room_available(room, new_check_in, new_check_out):
    # Parse dates
    new_check_in = datetime.strptime(new_check_in, "%Y-%m-%d")
    new_check_out = datetime.strptime(new_check_out, "%Y-%m-%d")
    
    # Check if room has bookings
    if "State" not in room or "Bookings" not in room["State"]:
        return True  # No existing bookings, the room is available

    # Check for overlap with existing bookings
    for booking in room["State"]["Bookings"]:
        existing_check_in = datetime.strptime(booking["check_in"], "%Y-%m-%d")
        existing_check_out = datetime.strptime(booking["check_out"], "%Y-%m-%d")
        
        # Overlap condition
        if new_check_in < existing_check_out and new_check_out > existing_check_in:
            return False  # Overlap detected

    return True  # No overlap, room is available

class getRooms(APIView):
    def get(self, request):
        try:
            hotel_id = request.query_params.get('Hotel_id')
            check_in = request.query_params.get('checkInDate')
            check_out = request.query_params.get('checkOutDate')
            
            if not (hotel_id and check_in and check_out):
                return Response(
                    {"message": "Hotel_id, checkInDate, and checkOutDate are required."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Fetch all rooms for the given hotel_id
            rooms = list(room_collection.find({"Hotel_id": hotel_id}))

            # Filter available rooms
            available_rooms = []
            for room in rooms:
                if is_room_available(room, check_in, check_out):
                    room['_id'] = str(room['_id'])  # Convert ObjectId to string
                    available_rooms.append(room)

            response = {"rooms": available_rooms}
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {e}")
            return Response(
                {"message": "Failed to get rooms.", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
class getRoom(APIView):
    def get(self, request):
        try:
            room_id = request.query_params.get('room_id')
            room = room_collection.find_one({"Id": room_id})
            if room:
                room['_id'] = str(room['_id'])  # Convert ObjectId to string
                return Response(room, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Room not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "Failed to get room."}, status=status.HTTP_400_BAD_REQUEST)
        
class initializeState(APIView):
    def post(self, request):
        try:
            room_collection.update_many(
                {},  # Match all documents
                {
                    "$set": {
                        "State": {"Bookings": []}  # Initialize State with an empty Bookings array
                    }
                }
            )
            return Response({"message": "State initialized."}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "Failed to initialize state."}, status=status.HTTP_400_BAD_REQUEST)
        
def is_valid_booking(room, new_check_in, new_check_out):
    # Check if room has bookings
    if "State" not in room or "Bookings" not in room["State"]:
        return True  # No existing bookings, it's valid

    # Parse dates
    new_check_in = datetime.strptime(new_check_in, "%Y-%m-%d")
    new_check_out = datetime.strptime(new_check_out, "%Y-%m-%d")

    # Check for overlap with existing bookings
    for booking in room["State"]["Bookings"]:
        existing_check_in = datetime.strptime(booking["check_in"], "%Y-%m-%d")
        existing_check_out = datetime.strptime(booking["check_out"], "%Y-%m-%d")
        
        # Overlap condition
        if new_check_in < existing_check_out and new_check_out > existing_check_in:
            return False  # Overlap detected

    return True  # No overlap

class updateRoom(APIView):
    def put(self, request):
        try:
            room_id = request.query_params.get('room_id')
            hotel_id = request.query_params.get('hotel_id')
            check_in = request.query_params.get('check_in')
            check_out = request.query_params.get('check_out')
            print(room_id, hotel_id, check_in, check_out)
            if not (room_id and hotel_id and check_in and check_out):
                return Response(
                    {"message": "room_id, hotel_id, check_in, and check_out are required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Fetch the room
            room = room_collection.find_one({"Id": room_id, "Hotel_id": hotel_id})
            if room:
                print('room found') 
            else: 
                print('room not found')
            if not room:
                return Response({"message": "Room not found."}, status=status.HTTP_404_NOT_FOUND)

            # Validate the booking dates
            if not is_valid_booking(room, check_in, check_out):
                return Response(
                    {"message": "Booking overlaps with an existing booking. Please choose different dates."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Update the room's bookings
            if "State" not in room:
                room["State"] = {"Bookings": []}

            room["State"]["Bookings"].append({
                "check_in": check_in,
                "check_out": check_out
            })

            # Update the room in the database
            room_collection.update_one(
                {"Id": room_id},
                {"$set": {"State": room["State"]}}
            )

            return Response({"message": "Room updated successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {e}")
            return Response(
                {"message": "Failed to update room.", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
class getRecommendedHotels(APIView):
    def get(self, request):
        try:
            user_id = request.query_params.get('user_id', None)
            user_address = request.query_params.get('user_address', None)
            is_new_user = requests.get(f'http://127.0.0.1:8080/payment/new_user?user_id={user_id}').json()['is_new_user'] if user_id else True
            
            recommendations = []
            
            if is_new_user:
                # New user - recommend cheap hotels in popular areas
                popular_areas = ["TP HCM", "Hà Nội", "Đà Nẵng"]
                for dest in popular_areas:
                    hotels = list(hotel_collection.find({"Area": dest}).sort("Price", 1).limit(3))
                    recommendations.extend(hotels)
                # recommendations = list(
                #     hotel_collection.find({"Area": {"$in": popular_areas}})
                #         .sort("Price", 1)
                #         .limit(10)
                
            elif user_address:
                # Known user address - recommend hotels near user's address
                recommendations = list(
                    hotel_collection.find({"Address": user_address})
                        .sort("Price", 1)
                        .limit(10)
                )
            else:
                # Default recommendation logic (trending areas)
                recommendation_areas = list(
                    hotel_collection.aggregate([
                        {"$group": {"_id": "$Area", "count": {"$sum": 1}}},
                        {"$sort": {"count": -1}},
                        {"$limit": 10}
                    ])
                )
                sum_of_count = sum([area['count'] for area in recommendation_areas])
                recommendations = []
                for area in recommendation_areas:
                    count = int(area['count'] / sum_of_count * 10)
                    if count > 0:
                        hotels = list(
                            hotel_collection.find({"Area": area['_id']})
                                .sort("Price", 1)
                                .limit(count)
                        )
                        recommendations.extend(hotels)
            for recommendation in recommendations:
                recommendation['_id'] = str(recommendation['_id'])
            response_data = {
                "recommendations": recommendations
            }
            response = JsonResponse(response_data, status=status.HTTP_200_OK)
            return response
        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "Failed to get recommended hotels."}, status=status.HTTP_400_BAD_REQUEST)
        
def count_hotels(request):
    locations= ['Thành phố Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Bà Rịa - Vũng Tàu']
    count = [0,0,0,0]
    try:
        for index,loc in enumerate(locations):
            count[index] = hotel_collection.count_documents({"Area": loc})
        response = {
            "HAN": count[1],
            "SGN": count[0],
            "DAD": count[2],
            "VTU": count[3]
        }
        return JsonResponse(response, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({"message": "Failed to count hotels."}, status=status.HTTP_400_BAD_REQUEST)
