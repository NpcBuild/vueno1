<template>
<!--  <div>-->
<!--    <div class="map-container">-->
<!--      <div class="map" ref="map"></div>-->
<!--      <div class="map-overlay">-->
<!--        <div class="marker" v-for="(marker, index) in markers" :key="index" :style="{ left: marker.left + 'px', top: marker.top + 'px' }" @click="showMarkerInfo(marker)">-->
<!--          <div class="marker-icon" :style="{ backgroundColor: marker.color }"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="info-container">-->
<!--      <div class="info">-->
<!--        <h3>{{ selectedMarker.name }}</h3>-->
<!--        <p>{{ selectedMarker.description }}</p>-->
<!--        <div class="form-group">-->
<!--          <label for="date">计划出行时间：</label>-->
<!--          <input type="date" class="form-control" id="date" v-model="selectedMarker.date">-->
<!--        </div>-->
<!--        <div class="form-group">-->
<!--          <label for="notes">备注信息：</label>-->
<!--          <textarea class="form-control" id="notes" rows="3" v-model="selectedMarker.notes"></textarea>-->
<!--        </div>-->
<!--        <button class="btn btn-primary" @click="saveMarker">保存</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div>
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <h1>旅行计划</h1>
<!--      <button @click="clearData">清空数据</button>-->
    </div>

    <!-- 地图容器 -->
    <div class="map-container">
      <l-map :zoom="zoom" :center="center" @click="addLocation" style="width: 100%; height: 600px;">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <!-- 在地图上显示标记 -->
<!--        <l-marker v-for="location in locations" :key="location.id" :lat-lng="getLocationLatLng(location)" @click="showLocationInfo(location)">-->
<!--        </l-marker>-->
        <l-marker :lat-lng="marker">
          <l-popup :content="text"></l-popup>
        </l-marker>
      </l-map>
    </div>

    <!-- 图片上传组件 -->
    <div class="upload-section">
      <input type="file" @change="uploadPhoto">
      <!-- 图片备注区域 -->
      <div v-for="photo in photos" :key="photo.id" class="photo-info">
        <img :src="photo.dataURL" alt="uploaded photo">
        <textarea v-model="photo.note" placeholder="Add notes here"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      mapInstance: null,
      markers: [],
      selectedMarker: {
        id: '',
        name: '',
        description: '',
        date: '',
        notes: '',
        color: '',
        left: '',
        top: ''
      },
      // 新
      zoom: 8,
      center: [0, 0], // 初始地图中心
      mapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // 地图图层链接
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', // 地图图层链接
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      locations: [], // 存储标记的地点和日期信息
      photos: [], // 存储上传的照片和备注信息
      marker: L.latLng(47.413220, -1.219482),
      text: 'this is a marker'
    };
  },
  mounted() {
    // this.initMap();
    // this.loadMarkers();
  },
  methods: {
    initMap() {
      this.mapInstance = L.map(this.$refs.map).setView([39.9, 116.38], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors'
      }).addTo(this.mapInstance);
      this.mapInstance.on('click', this.addMarker);
    },
    loadMarkers() {
      axios.get('/api/markers')
          .then(response => {
            this.markers = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    addMarker(event) {
      const marker = {
        name: '',
        description: '',
        date: '',
        notes: '',
        color: '#1E90FF',
        left: event.containerPoint.x,
        top: event.containerPoint.y
      };
      this.selectedMarker = marker;
    },
    showMarkerInfo(marker) {
      this.selectedMarker = Object.assign({}, marker);
    },
    saveMarker() {
      if (this.selectedMarker.id) {
        axios.put(`/api/markers/${this.selectedMarker.id}`, this.selectedMarker)
            .then(response => {
              const updatedMarker = response.data;
              const index = this.markers.findIndex(marker => marker.id === updatedMarker.id);
              this.markers.splice(index, 1, updatedMarker);
            })
            .catch(error => {
              console.error(error);
            });
      } else {
        axios.post('/api/markers', this.selectedMarker)
            .then(response => {
              const newMarker = response.data;
              this.markers.push(newMarker);
            })
            .catch(error => {
              console.error(error);
            });
      }
    },
    // 新
    addLocation(event) {
      // 在地图上添加标记
      const latLng = event.latlng;
      const location = {
        id: Date.now(),
        latLng,
        date: '', // 哪天计划去游玩
        place: '', // 游玩的地方
      };
      this.locations.push(location);
    },
    showLocationInfo(location) {
      // 在这里可以处理标记点击事件，比如展示该地点的计划和日期信息
      console.log(location)
    },
    uploadPhoto(event) {
      // 图片上传处理
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        const photo = {
          id: Date.now(),
          dataURL,
          note: '', // 照片备注
        };
        this.photos.push(photo);
      };
      reader.readAsDataURL(file);
    },
    // 添加获取标记位置经纬度的方法
    getLocationLatLng(location) {
      return location.latLng;
    },
    clearData() {
      // 添加清空数据功能
      if (window.confirm('确定要清空所有数据吗？')) {
        this.locations = [];
        this.photos = [];
      }
    }
  }
};
</script>

<style>
.map-container {
  height: 400px; /* 设置合适的高度，可以根据需要调整 */
}
</style>
