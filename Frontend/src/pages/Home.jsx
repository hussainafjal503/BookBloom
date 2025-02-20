import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../components/Navbar/Navbar";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";
import book3 from "../assets/book3.jpeg";
import reading1 from '../assets/reading1.jpg';
import reading2 from '../assets/reading2.jpg';
import reading3 from '../assets/reading3.jpg';
import Footer from '../components/Footer/Footer'
import RecentlyAdded from '../components/Home/RecentlyAdded'


// import './styles.css';

function Home() {


  
  return (
    <>
    <Navbar>
      <div className="bg-[#33747c]">
        {/* section 1 */}
        <div className="  md:w-11/12 md:flex gap-8 bg-[#33747c] p-8 mx-auto md:px-16 md:py-12 ">
          <div className=" flex flex-col gap-4 md:mt-20 pt-10">
            <h1 className="font-bold text-5xl md:w-9/12 text-white mb-4">
              Discover Your Next Great Read
            </h1>
            <p className="text-gray-300 w-11/12 text-2xl font-semibold mb-8">
              Uncover captivating Stories, enriching knowledge, and endless
              inspiration in our curated collection of books
            </p>

            <button className="bg-transparent rounded-full w-fit py-2 px-6 text-white font-bold border text-2xl border-white mt-4 hover:bg-yellow-600 hover:border-none hover:scale-95 transition-all shadow-gray-500 shadow-md duration-200 hover:text-black">
              Discover Books
            </button>
          </div>

          <div className=" w-full mt-8 md:w-[50%] md:mt-12 ">
            <Swiper
              centeredSlides={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src="/images/bookstore2.png"
                  alt=""
                  className="rounded-md "
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/bookstore3.png"
                  alt=""
                  className="rounded-md"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="/images/bookstore1.png"
                  alt=""
                  className="rounded-md"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="/images/bookstore4.png"
                  alt=""
                  className="rounded-md"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* section 2 */}
        <div className="w-full bg-gray-300 ">
          <div className="md:flex flex-col gap-2 md:p-16  md:w-11/12 mx-auto">
            <div className="md:flex gap-6 text-center  justify-between">
              <div className="md:flex flex-col gap-4 mb-10 pt-10">
                <h1 className="text-2xl font-bold text-yellow-600   ">
                  Explore Our Top Categories
                </h1>
                <span className="text-red-400 font-semibold ">
                  _________________Categories
                </span>
              </div>

              <p className=" p-6 md:pr-24 font-semibold w-full  md:w-8/12 text-justify float-end ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deleniti rerum a officia soluta quasi voluptatum laborum autem,
                mollitia at expedita?Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Facilis at rerum, sapiente neque, tempora eum
                veritatis repudiandae praesentium nam earum quis ullam officia
                non reprehenderit autem accusamus, distinctio cum? Ipsum autem
                odio minus est, cupiditate assumenda asperiores culpa aspernatur
                voluptas quos sint, quidem distinctio non voluptatem facere
                accusamus, optio incidunt!
              </p>
            </div>

            <div className="md:flex gap-12 mt-10">
              <div className="  ">
                <div className=" flex flex-col gap-2 p-6">
                  <img
                    src={book1}
                    alt=""
                    className="w-full h-[250px] rounded-md"
                  />
                  <h2 className="font-semibold text-center text-2xl mt-6">
                    Higher Education
                  </h2>
                  <p className="text-center text-md text-gray-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Incidunt impedit minus quae iusto recusandae quo saepe sit
                    numquam quia temporibus.
                  </p>
                </div>
              </div>

              <div className="  ">
                <div className=" flex flex-col gap-2 p-6">
                  <img
                    src={book2}
                    alt=""
                    className="w-full h-[250px] rounded-md"
                  />
                  <h2 className="font-semibold text-center text-2xl mt-6">
                    Management Books
                  </h2>
                  <p className="text-center text-md text-gray-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Incidunt impedit minus quae iusto recusandae quo saepe sit
                    numquam quia temporibus.
                  </p>
                </div>
              </div>

              <div className="  ">
                <div className=" flex flex-col gap-2 p-6">
                  <img
                    src={book3}
                    alt=""
                    className="w-full h-[250px] rounded-md"
                  />
                  <h2 className="font-semibold text-center text-2xl mt-6">
                    Engineering Books
                  </h2>
                  <p className="text-center text-md text-gray-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Incidunt impedit minus quae iusto recusandae quo saepe sit
                    numquam quia temporibus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

<RecentlyAdded/>

        {/* section 3 */}

        <div className="bg-gray-200 w-full">
          <div className="flex flex-col w-11/12 text-center pt-12 mx-auto r items-center ">
            <h2 className="font-bold text-3xl text-gray-900 mb-6 ">Still not Sure ?</h2>
            <p className="text-gray-700 w-5/12 mx-auto">Jump start your reading by quickly check through the popular book categories. 1000+ boooks are published by different authors everyday.Buy your favourite books on Book Bloom Today.</p>

            <button className="font-bold text-lg rounded-md px-4 py-1 border border-gray-900 w-fit mt-10  shadow-lg shadow-gray-950 mb-10 hover:bg-gray-300 hover:scale-95 transition-all duration-300">Read FAQ</button>
          </div>
        </div>

        {/* section 4 */}

        <div className="bg-gray-200 w-full">
         
              <div className="md:w-11/12 mx-auto flex flex-col gap-8 pt-10">
              
                <div className=" md:w-10/12 mx-auto flex flex-row justify-center items-center">
                  <div className="border border-gray-400 h-0 w-8/12"></div>
                  <h2 className="font-bold text-3xl text-gray-900 w-6/12 text-center">Latest Articles</h2>
                  <div className="border border-gray-400 h-0 w-8/12"></div>
                </div>

                <div className="md:flex flex-row gap-10 w-11/12 justify-center mx-auto mb-10">
                  <div className="flex flex-col gap-4 mb-10 ">
                    <img src={reading1} alt="" className="rounded-md w-full h-[250px]" />
                    <span className="text-gray-500"> 2 Aug 2024</span>
                    <p className="text-gray-900 w-11/12"> Reading Books Always Makes The Moments Happy..</p>
                  </div>

                  <div className="flex flex-col gap-4 mb-10  ">
                    <img src={reading2} alt="" className="rounded-md w-full h-[250px]" />
                    <span className="text-gray-500"> 1 Jan 2025</span>
                    <p className="text-gray-900 w-11/12"> Reading Books Always Makes The Moments Happy..</p>
                  </div>
                  <div className="flex flex-col gap-4 mb-10  ">
                    <img src={reading3} alt="" className="rounded-md w-full h-[250px]" />
                    <span className="text-gray-500"> 2 Aug 2024</span>
                    <p className="text-gray-900 w-11/12"> Reading Books Always Makes The Moments Happy..</p>
                  </div>

                </div>
              </div>
        </div>
      </div>
    </Navbar>
    <Footer/>
    </>
  );
}

export default Home;
