import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    return (
        <div>
            <footer>
                <div className="footer-container">
                    <div className="footer-element footer-FW">
                        <p className="footer-element-title">Find Worker</p>
                        <a className='links' href="">О нас</a><br/>
                        <a className='links' href="">Инвесторам</a><br/>
                        <a className='links' href="">Партнерам</a>
                    </div>
                    <div className="footer-element applicant">
                        <p className="footer-element-title">Соискателям</p>
                        <a className='links' href="">Готовое резюме</a><br/>
                        <a className='links' href="">Хочу у вас работать</a>
                    </div>
                    <div className="footer-element mobile">
                        <p className="footer-element-title">Мобильное приложение</p>
                        <p className="footer-element-title">(coming soon)</p>
                    </div>
                    <div className="footer-element social">
                        <p className="footer-element-title">Мы в соц. сетях</p>
                        <a className='links' href="">
                            <img src="/images/Telegram.png" alt="telegram"/>
                        </a>
                        <a className='links' href="">
                            <img src="/images/twitter.png" alt="X"/>
                        </a>
                        <a className='links' href="">
                            <img src="/images/VK.png" alt="VK"/>
                        </a>
                    </div>
                    <div className="footer-element years">2024-2025</div>
                    <div className="footer-element QR">
                        <img src="/images/QRmobile.JPG" alt='QRcode'></img>
                    </div>
                </div>

            </footer>
        </div>
    );
};

export default Footer;