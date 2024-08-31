import { Button } from '@mui/material'
import React from 'react'
import { GoPeople } from 'react-icons/go'
import { IoBedOutline, IoCalendarNumberOutline } from 'react-icons/io5'
import { MdArrowRightAlt } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react'

const FiltersSwiper = ({people, roomsNum, date, toggleDrawer}) => {

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    
  return (
    <div className="flex items-center justify-around m-4 w-full">
    <div className="flex w-full ml-4 h-[60px]">
      <Swiper spaceBetween={10} slidesPerView={3}>
        <SwiperSlide className="!min-w-[220px]">
          <Button
            startIcon={
              <IoCalendarNumberOutline className="!text-2xl !flex !items-center" />
            }
            onClick={toggleDrawer(true, 1)}
            sx={{
              padding: "12px 16px",
              minWidth: "220px",
              borderRadius: "99px",
              fontWeight: "500",
              fontSize: "16px",
              textTransform: "none",
              color: "black",
              border: "1px solid #9e9e9e",
            }}
          >
            {date[0].startDate.getDate()}{" "}
            {monthNames[date[0].startDate.getMonth()]}
            <MdArrowRightAlt className="!text-3xl mx-1" />{" "}
            {date[0].endDate.getDate()}{" "}
            {monthNames[date[0].endDate.getMonth()]}
          </Button>
        </SwiperSlide>
        <SwiperSlide className="!w-[75px]">
          <Button
            startIcon={
              <IoBedOutline className="!text-2xl !flex !items-center" />
            }
            onClick={toggleDrawer(true, 2)}
            className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
          >
            {roomsNum}
          </Button>
        </SwiperSlide>
        <SwiperSlide className="!w-[75px]">
          <Button
            startIcon={
              <GoPeople className="!text-2xl !flex !items-center" />
            }
            onClick={toggleDrawer(true, 2)}
            className="!rounded-full !font-semibold !px-4 !py-3 !text-lg !normal-case !text-black items-baseline !border !border-[#9e9e9e] !border-solid"
          >
            {people}
          </Button>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  )
}

export default FiltersSwiper