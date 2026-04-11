
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../../public/home/01.jpg"

import img2 from "../../../../public/home/02.jpg"
import img3 from "../../../../public/home/03.png"
import img4 from "../../../../public/home/04.jpg"
import img5 from "../../../../public/home/05.png"
import img6 from "../../../../public/home/06.png"


const Banner = () => {
    return (
      <div className="">
         <Carousel className="">
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img4} />
                </div>
                <div>
                    <img src={img5} />
                </div>
                <div>
                    <img src={img6} />
                </div>

            </Carousel>
      </div>
    );
};

export default Banner;