<template>
	<view class="detail">
		<view class="fixbg" :style="{ backgroundImage: 'url(' + songDetail.al.picUrl + ')' }"></view>
		<musichead :title="songDetail.name" :icon="true"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="detail-play" @tap="handeltoplay">
					<image :src="songDetail.al.picUrl" :class="{'detail-play-run':isplayRotate}" mode=""></image>
					<text class="iconfont" :class="iconplay" ></text>
				</view>
				<view class="detail-playlyric">
					<view class="detail-playlyric-wrap">
						<view class="detail-playlyric-item active" :class="{ active: lyricIndex == index}" v-for="(item, index) in songLyric" :key="index">{{ item.lyric }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import '@/common/iconfont.css';
import musichead from '../../components/musichead/musichead.vue';
import { songDetail, songLyric ,songurl  } from '../../common/api.js';
export default {
	data() {
		return {
			songDetail: {    al: {picUrl:''}    },
			songLyric:[],
			lyricIndex:0,
			iconplay:'icon-bofang',
			isplayRotate:true
		};
	},
	components: {
		musichead
	},
	onLoad(e) {
		console.log(e.songId);
		this.getMusic(e.songId);
	},
	methods: {
		handeltoplay(){
			if(this.bgAudioManager.paused){
				this.bgAudioManager.play();
			}else{
				this.bgAudioManager.pause();
			}
		},
		getMusic(songId) {
			Promise.all([songDetail(songId), songLyric(songId) , songurl(songId)]  ).then(res => {
				 console.log(res)
				if (res[0][1].data.code == '200') {
					this.songDetail = res[0][1].data.songs[0];
				}
				if (res[1][1].data.code == '200') {
					let lyric = res[1][1].data.lrc.lyric;
					let re = /\[([^\]]+)\]([^\[]+)/g;
					let result = [];
					lyric.replace(re, ($0, $1, $2) => {
						result.push({ time: this.formaTimetoSec($1), lyric: $2 });
					});
					this.songLyric = result;
				}
				if(res[2][1].data.code=='200'){
					this.bgAudioManager = uni.getBackgroundAudioManager();
					this.bgAudioManager.title = this.songDetail.name;
					this.bgAudioManager.src = res[2][1].data.data[0].url || ';'
					this.bgAudioManager.onPlay(()=>{
						this.iconplay='icon-zanting';
						this.isplayRotate= true;
					});
					this.bgAudioManager.onPause(()=>{
						this.iconplay='icon-bofang';
						this.isplayRotate=false
					})
				}
                  
			});
		},
		formaTimetoSec(value) {
			let arr = value.split(':');
			return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1);
		}
	}
};
</script>

<style scoped>
.detail-play {
	width: 580rpx;
	height: 580rpx;
	margin: 180rpx auto 0 auto;
	background-size: cover;
	position: relative;
}
.detail-play image {
	border-radius: 50%;
	width: 100%;
	height: 100%;
	animation: 10s linear move infinite;
	animation-play-state: paused;
}
.detail-play  .detail-play-run{animation-play-state: running;}
@keyframes move{form{transform: rotate(0deg);} to{ transform: rotate(360deg);}}
.detail-play text {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 100rpx;
}
/* 歌词 */
.detail-playlyric {
	font-size: 32rpx;
	line-height: 82rpx;
	height: 246rpx;
	text-align: center;
	overflow: hidden;
	margin-top: 80rpx;
	color: #6f6e73;
}
.detail-playlyric-wrap {color: #6f6e73;
}
.detail-playlyric-item {
	height: 82rpx;
}
.detail-playlyric-item.active {
	color: #0086b3;
}
</style>
