<template>
  <div>
    <div ref="mapContainer" class="map-container"></div>
    <el-dialog :visible.sync="dialogVisible" title="详情" width="80%">
      <img :src="selectedPoint.image" v-if="selectedPoint.image" class="detail-image" />
      <p>{{ selectedPoint.text }}</p>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  data() {
    return {
      chart: null,
      // points: [],
      dialogVisible: false,
      selectedPoint: {}, // 存储点击的点
      points: [
        { name: '北京', value: [116.405285, 39.904989], image: '/images/beijing.jpg', text: '北京是中国的首都' },
        { name: '上海', value: [121.472644, 31.231706], image: '/images/shanghai.jpg', text: '上海是中国的金融中心' },
      ],
    };
  },
  mounted() {
    this.loadChinaMap();
    this.fetchIpLocation();
  },
  methods: {
    loadChinaMap() {
      fetch('/map/china.json')
        .then(response => response.json())
        .then(data => {
          echarts.registerMap('china', data);
          this.initMap();
        })
        .catch(error => {
          console.error('地图数据加载失败:', error);
        });
    },
    initMap() {
      this.chart = echarts.init(this.$refs.mapContainer);
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
        },
        geo: {
          map: 'china',
          roam: false,
          label: { emphasis: { show: false } },
          itemStyle: { normal: { areaColor: '#d1e9ff', borderColor: '#111' } },
        },
        series: [{
          name: '标记点',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.points,
          symbolSize: 10,
          label: { show: false },
          emphasis: { label: { show: true } },
        }],
      });
      this.chart.on('click', this.handleClick);
    },
    handleClick(params) {
      if (params.componentType === 'series') {
        this.selectedPoint = params.data;
        this.dialogVisible = true;
      }
    },
    fetchIpLocation() {
      axios.get('https://ipapi.co/json/').then((res) => {
        const { latitude, longitude, city } = res.data;
        this.addPoint([longitude, latitude], `${city} 访问者`, 'https://example.com/image.jpg', '访问者详情文本');
      });
    },
    addPoint(coords, name, image, text) {
      this.points.push({ name, value: coords, image, text });
      this.chart.setOption({ series: [{ data: this.points }] });
    },
  },
};
</script>

<style>
.map-container {
  width: 100%;
  height: 500px;
}
.detail-image {
  width: 100%;
  max-height: 300px;
}
</style>
