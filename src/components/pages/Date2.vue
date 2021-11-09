<template>
  <div>
    <div id="app" v-cloak>
      <h1>{{calendar.year}} 年 {{calendar.month+1}} 月</h1>
      <div class="row  justify-content-around">
        <div class="col-md-4">
          <!-- <button  class="outColor btn btn-outline-success btn-sm" v-if="set">營業時間</button>
          <button   class="inColor btn btn-outline-success btn-sm" v-if="!set">外送時間</button> -->
          <button   class="btn btn-outline-success btn-sm" >新增營業時間</button>
          <button   class="btn btn-outline-success btn-sm" >新增外送時間</button>
          
        </div>
        <div class="col-md-8 text-right " >
            <button @click="adjustYear(-1)"  class="btn btn-outline-success btn-sm ">上一年</button>
            <button @click="adjustMonth(-1)" class="btn btn-outline-success btn-sm">上個月</button>
            <button @click="setToday" class="btn btn-outline-success btn-sm">今天</button>
            <button @click="adjustMonth(1)" class="btn btn-outline-success btn-sm">下個月</button>
            <button @click="adjustYear(1)" class="btn btn-outline-success btn-sm  right ">下一年</button>
          
        </div>
      </div>
      
      <div class="calendar">
        <div class="weekDay">
            <div class="text-success text-center">日</div>
            <div class="text-success text-center">一</div>
            <div class="text-success text-center">二</div>
            <div class="text-success text-center">三</div>
            <div class="text-success text-center">四</div>
            <div class="text-success text-center">五</div>
            <div class="text-success text-center">六</div>
        </div>
        <div class="week text-success text-center" v-for="i in 6" :key="i" >
          <div class="day " v-for="j in 7" :data-date="calendarMonth[(i-1)*7+j-1].date"
            v-bind:class="{
             today:calendarMonth[(i-1)*7+j-1].year === today.year && calendarMonth[(i-1)*7+j-1].month === today.month && calendarMonth[(i-1)*7+j-1].date === today.date
             ,styleSun:j===1,style:j===7,
             other:calendarMonth[(i-1)*7+j-1].month !== calendar.month 
            } "
          :key="calendarMonth[(i-1)*7+j-1].date"  
          >
          <!-- <div class="fc-daygrid-day-top" v-text="calendarMonth[(i-1)*7+j-1].date"   -->
          <div class="aaa myMOUSE shadow-sm rounded circle" v-text="calendarMonth[(i-1)*7+j-1].date"  
            v-bind:class="{
             todayaaa:calendarMonth[(i-1)*7+j-1].year === today.year && calendarMonth[(i-1)*7+j-1].month === today.month && calendarMonth[(i-1)*7+j-1].date === today.date 
             ,styleSun:j===1,style:j===7,
             other:calendarMonth[(i-1)*7+j-1].month !== calendar.month 
            } "
          :key="calendarMonth[(i-1)*7+j-1].date"  ></div>
          <div class="shadow-sm  rounded rounded-pill" :class="{bbb:  calendarMonth[(i-1)*7+j-1].time < today.time -24*60*60*1000     , inColor:set, outColor:!set}">{{calendarMonth[(i-1)*7+j-1].time}}</div>
          <div class="shadow-sm  rounded rounded-pill" :class="{bbb:calendarMonth[(i-1)*7+j-1].date < today.date &&calendarMonth[(i-1)*7+j-1].month <= today.month &&calendarMonth[(i-1)*7+j-1].year <= today.year , inColor:set, outColor:!set}">{{today.time}}</div>
          <div class="shadow-sm  rounded rounded-pill" :class="{bbb:calendarMonth[(i-1)*7+j-1].date < today.date &&calendarMonth[(i-1)*7+j-1].month < today.month &&calendarMonth[(i-1)*7+j-1].year === today.year , inColor:set, outColor:!set}">10:00~20:00</div> 
          <div class="shadow-sm  rounded rounded-pill" :class="{bbb:calendarMonth[(i-1)*7+j-1].date < today.date &&calendarMonth[(i-1)*7+j-1].month < today.month &&calendarMonth[(i-1)*7+j-1].year === today.year , inColor:set, outColor:!set}">10:00~20:00</div> 
          <!-- <div :class="{bbb:calendarMonth[(i-1)*7+j-1].date < today.date}">10:00~20:00</div> -->
          <!-- <div :class="{bbb:calendarMonth[(i-1)*7+j-1].date < today.date}">123</div> -->
          </div>
        </div>
      </div>
    </div>
    
  

  </div>
</template>

<script>
import $ from "jquery";
export default {
          data() {
            return {
              today:{
                year:0,
                month:0,
                date:0,
                day:0,
                time:0
              },
              calendar:{
                year:0,
                month:0,
                date:0,
                day:0,
                time:0
              },
              set:true,
              // set:false ,
            };
          },
          mounted(){
            this.setToday()
          },
          methods:{
            setToday(){
              const date = new Date()
              this.today.year = this.calendar.year = date.getFullYear()
              this.today.month = this.calendar.month = date.getMonth() // 0~11
              this.today.date = this.calendar.date = date.getDate()
              this.today.day = this.calendar.day = date.getDay()
              this.today.time = this.calendar.time = date.getTime()
            },
            adjustYear(fix){
              this.calendar.year += fix
            },
            adjustMonth(fix){
              // this.calendar.month += fix 範圍
              let month = this.calendar.month + fix
              if(month > 11){
                this.adjustYear(1)
                this.calendar.month = 0
              }else if(month < 0){
                this.adjustYear(-1)
                this.calendar.month = 11
              }else{
                this.calendar.month = month
              }

            }
          },
          computed:{
            // monthFirstDay(){
            //   const date = new Date(this.calendar.year,this.calendar.month,1)
            //   return {
            //     year:date.getFullYear(),// this.calendar.year
            //     month:date.getMonth(),// this.calendar.month
            //     date:date.getDate(),// 1
            //     day:date.getDay(),
            //   }
            // },
            calendarFirstDay(){
              const mDate = new Date(this.calendar.year,this.calendar.month,1)
              const date = new Date(this.calendar.year,this.calendar.month,1 - mDate.getDay())
              
              console.log('--mDate--',mDate)
              console.log('--mDate.getDay()--',mDate.getDay())
              console.log('--date--',date)
              console.log('--getTime--',date.getTime())
              return {
                year:date.getFullYear(),
                month:date.getMonth(),
                date:date.getDate(),
                day:date.getDay(),
                time:date.getTime(),
              }
            },
            calendarMonth(){
              const data = []
              let date

              
              // console.log('-calendarMonth-getTime--',date.getTime())
              for(let i=0;i<42;i++){
                date = new Date(this.calendarFirstDay.year,this.calendarFirstDay.month,this.calendarFirstDay.date + i)
                data.push({
                  year:date.getFullYear(),
                  month:date.getMonth(),
                  date:date.getDate(),
                  day:date.getDay(),
                  time:date.getTime()
                })
              }
              return data
            }

          }
};
</script>

<style lang="scss" scoped>

      
      [v-cloak]{
        display: none;
      }

      html{
        text-align: center;
      }

      .calendar{
        margin:30px 0;
      }

      .weekDay,.week{
        display: flex;
        border-bottom: 1px solid #ddd;
      }
      .weekDay>div{
        flex: 1 1 0%;
        line-height: 30px;
      }
      .week{
        border-right: 1px solid #ddd;
        
        background-color: rgba(245, 253, 237, 0.699);
      }
      .week>div{
        position: relative;
        flex: 1 1 0%;
        height: 150px;
        line-height: 30px;
        border-left: 1px solid #ddd;
      }
      // .week>div:before{
      //   position: absolute;
      //   content:attr(data-date);
      //   top: 0;
      //   right: 0;
      //   display: block;
      //   width: 30px;
      //   border-left: 1px solid #ddd;
      //   border-bottom: 1px solid #ddd;
      // }

      

      .todaya{
        color: #fff;
        background-color: rgba(5, 160, 75, 0.411);
        content: '';
      }

      .styleSun{
        color: rgb(32, 148, 71);
        background-color: rgba(253, 211, 200, 0.49);
      }

      .style{
        color: rgb(32, 148, 71);
        background-color: rgba(136, 252, 142, 0.301);
      }

      .other{
        color: #bbb;
        background-color: rgba(221, 219, 219, 0.247);
      }
      
      .aaa{
        color: rgba(7, 95, 4, 0.747);
        background-color: rgba(1, 68, 20, 0.062);
      }
      
      .todayaaa{
        // color: rgb(250, 245, 245);
        background-color: rgba(4, 194, 178, 0.349);
      }
      
      .bbb{
        color: #bbb;
      }
      .today{
        color: rgba(4, 196, 180, 0.904);
        content: '';
        // border: 1px solid rgba(252, 239, 123, 0.89);
        border-left: 100px solid rgba(255, 22, 22, 0.658);
      }

      .myMOUSE {
        cursor: pointer;

      }
      .fc-daygrid-day-top {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
        -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
  }
  // .fc-daygrid-day-top {
  //   opacity: 0.3;
  // }
  // .fc-daygrid-day-top {
  //   display: flex;
  //   flex-direction: row-reverse;
  // }
  // .fc-daygrid-day-top {
  //   opacity: 0.3;
  // }

  .inColor{
    background-color: rgba(93, 247, 252, 0.060);
  }
  .outColor{
    background-color: rgba(221, 29, 205, 0.06);
  }
</style>