import Chart from 'chart.js';

export const chartPlugin = () => {
    //set chart background color and size
    Chart.pluginService.register({
        beforeDraw: function (chart, easing) {
            if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
                const helpers = Chart.helpers;
                const ctx = chart.chart.ctx;
                const chartArea = chart.chartArea;
                ctx.save();
                ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                ctx.fillRect(0, 0, 
                    chartArea.right + chartArea.left, 
                    chartArea.bottom + chartArea.top + chart.config.options.chartArea.bottom);
                ctx.restore();
            }
        }
    });
    //set chart default font color
    Chart.defaults.global.defaultFontColor = '#fff';
}