<template>
  <div>
    <apexchart width="100%" height="300px" type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
export default {
  props: ["chartvertical", "charthorizontal"],
  data: function () {
    return {
      title: {},
      chartOptions: {
        colors: ["#ff9917"],
        plotOptions: {
          bar: {
            borderRadius: 2,
          },
        },
        chart: {
          id: "VueApexCharts",
        },
        xaxis: {
          categories: this.$props.charthorizontal,
        },  responsive: [
          {
            breakpoint: 1000, // Max width of 1000px
            options: {
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 1000, // Max width of 600px
            options: {
              plotOptions: {
                bar: {
                  horizontal: false,
                },
              },
            },
          },
        ],
        yaxis: {
         min:0,
          floating: false,    
          type: "category",
          min:0,
          max:10,
          tickPlacement: "on",    
          labels: {
              rotate: 0,
              tickAmount: "dataPoints",
              rotateAlways: false,
              formatter: function (val) {
                return val.toFixed(0);
              }
            },
            
        },
      },
      series: [
        {
          name: "Sadasd",
          data: this.$props.chartvertical,
        },
      ],
    };
  },
};
</script>
<style>
.apexcharts-toolbar {
  display: none !important;
}
/* 
foreignObject {
  background: #f0f1f8 !important;
  border-radius: 20px;
  x: 7%;
  y: 23px;
  height: 250px;
  width: 94%;
} */

#SvgjsSvg1572 {
  width: 108% !important;
}
@media screen and (max-width: 993px) {
.apexcharts-text tspan {
    font-family: inherit;
    font-size: 7px;
}
#SvgjsSvg2962{
  width: 100% !important;
}
}
</style>
