import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IonIcon } from '@ionic/react';
import {
  logoFacebook,
  logoInstagram,
  logoYoutube,
  logoTiktok,
  airplaneOutline,
  busOutline,
  carOutline,
  businessOutline,
} from 'ionicons/icons';

const Footer = () => {
  return (
    <footer className="container-fluid  text-light bottom-0" style={{background: '#202c34'}}>
      <div className="container d-flex flex-column">
        {/* Top Section */}
        <div className="footer__top-container d-flex flex-row p-2 gap-4">
          {/* Brand Section */}
          <div className="col-3 d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2">
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                className="img-fluid"
                style={{ width: '50px' }}
              />
              <h3 className="fw-bold fst-italic m-0">travelowkey</h3>
            </div>
            <div className="d-flex justify-content-between">
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2019/09/23/1569229181629-eeb038ad844874f951326d0a8534bf48.png?tr=q-75,w-100"
                alt="Logo1"
                className="w-25"
              />
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2017/12/13/1513150321127-5096be77d2a19401b476853e54ba2cc6.svg?tr=h-35,q-75"
                alt="Logo2"
                className="w-25"
              />
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2021/05/10/1620638808154-e6c02ed786235ab59252628a9aa9b715.png?tr=h-35,q-75"
                alt="Logo3"
                className="w-25"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-9 d-flex justify-content-between">
            {/* Follow Us */}
            <div className="d-flex flex-column gap-2">
              <h5>Theo dõi chúng tôi trên</h5>
              <a href="https://www.facebook.com/TravelokaVN" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <IonIcon icon={logoFacebook} />
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/traveloka.vn/" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <IonIcon icon={logoInstagram} />
                <span>Instagram</span>
              </a>
              <a href="https://www.youtube.com/@travelokavn" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <IonIcon icon={logoYoutube} />
                <span>Youtube</span>
              </a>
              <a href="https://www.tiktok.com/@traveloka.vn" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <IonIcon icon={logoTiktok} />
                <span>Tiktok</span>
              </a>
            </div>

            {/* Products */}
            <div className="d-flex flex-column gap-2">
              <h5>Sản phẩm</h5>
              <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <IonIcon icon={airplaneOutline} />
                <span>Vé máy bay</span>
              </a>
              <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <IonIcon icon={busOutline} />
                <span>Vé xe khách</span>
              </a>
              <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <IonIcon icon={carOutline} />
                <span>Xe dịch vụ</span>
              </a>
              <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-2">
                <IonIcon icon={businessOutline} />
                <span>Khách sạn</span>
              </a>
            </div>

            {/* Other Links */}
            <div className="d-flex flex-column gap-2">
              <h5>Khác</h5>
              <a href="#" className="text-light text-decoration-none">
                Chính sách quyền riêng tư
              </a>
              <a href="#" className="text-light text-decoration-none">
                Điều khoản & Điều kiện
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 2" fill="none" className="w-100">
            <path d="M0 1H1152" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom-container d-flex flex-column align-items-center p-2">
          <div>Trường Đại học Công nghệ thông tin - ĐHQG TPHCM</div>
          <div>Copyright © 2003 - 2023 Travelowkey Inc.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
