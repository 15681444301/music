<template>
	<view class="lists">
		<view class="fixbg" :style="{ backgroundImage: 'url(' + playlist.coverImgUrl + ')' }"></view>
		<musichead title="歌单" :icon="true" color="white"></musichead>
		<view class="container" >
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl" mode=""></image>
						<text class="iconfont icon-right-s">{{ playlist.playCount | formatcount }}</text>
					</view>
					<!-- 头部右侧 -->
					<view class="list-head-text">
						<view>{{ playlist.name }}</view>
						<view>
							<image :src="playlist.creator.avatarUrl" mode=""></image>
							{{ playlist.creator.nickname }}
						</view>
						<view>{{ playlist.description }}</view>
					</view>
				</view>

				<!-- 播放列表 -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-yousanjiao"></text>
						<text>播放全部</text>
						<text>({{ playlist.trackCount }})</text>
					</view>
					<!-- 循环歌曲详细信息 -->
					<view class="list-music-item" v-for="(item, index) in playlist.tracks" :key="index" @tap="handletoDetail(item.id)">
						<view class="list-music-top">{{ index + 1 }}</view>
						<view class="list-music-song">
							<view>{{ item.name }}</view>
							<view>{{ item.ar[0].name }}-{{ item.name }}</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>

					<!-- 	<view class="list-music-item">
						<view class="list-music-top">1</view>
						<view class="list-music-song">
							<view>无我无语</view>
							<view>午挖到大</view>
							</view>
							<text class="iconfont icon-zanting1">
							</text>
						</view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import musichead from '../../components/musichead/musichead.vue';
import '@/common/iconfont.css';
import { list } from '../../common/api.js';
export default {
	data() {
		return {
			playlist: {
				coverImgUrl: '',
				creator: {
					avatarUrl: ''
				},
				trackCount: ''
			}
		};
	},
	components: {
		musichead
	},
	// 生命周期  页面加载
	onLoad(options) {
		// console.log(options.listId)
		uni.showLoading({
			title:'加载中'
		})
		list(options.listId).then(res => {
			console.log(res);
			if (res[1].data.code == '200') {
				this.playlist = res[1].data.playlist;
				uni.hideLoading();
			}
		});
	},
	methods: {
		handletoDetail(songId){
			uni.navigateTo({
				url:'../detail/detail?songId=' + songId
			})
		}
	}
};
</script>

<style scoped>
.list-head {
	display: flex;
	margin: 30rpx;
}
.list-head-img {
	width: 264rpx;
	height: 264rpx;
	border-radius: 30rpx;
	overflow: hidden;
	position: relative;
	margin-right: 42rpx;
}
.list-head-img image {
	width: 100%;
	height: 100%;
	margin-right: ;
}
.list-head-img text {
	position: absolute;
	right: 8rpx;
	top: 8rpx;
	color: white;
	font-size: 26rpx;
}

.list-head-text {
	flex: 1;
	margin-bottom: 30rpx;
	color: #f0f2f7;
}
.list-head-text view:nth-child(1) {
	color: white;
	font-size: 34rpx;
}
.list-head-text view:nth-child(2) {
	display: flex;
	margin-right: 14rpx;
	margin: 20rpx 0;
	font-size: 24rpx;
	align-items: center;
}
.list-head-text view:nth-child(2) image {
	width: 54rpx;
	height: 54rpx;
	border-radius: 50%;
	margin-right: 10rpx;
}
.list-head-text view:nth-child(3) {
	line-height: 32rpx;
	font-size: 22rpx;
}

/* 播放列表 */
.list-music {
	background-color: white;
	border-radius: 50rpx;
	margin-top: 40rpx;
	overflow: hidden;
	align-items: center;
}
.list-music-head {
	height: 50rpx;
	margin: 30rpx 0 0 22rpx;
}
.list-music-head text:nth-child(1) {
	height: 50rpx;
	font-size: 50rpx;
}
.list-music-head text:nth-child(2) {
	font-size: 30rpx;
	margin: 0 10rpx 0 26rpx;
}
.list-music-head text:nth-child(3) {
	font-size: 26rpx;
	color: #b2b2b2;
}

.list-music-item {
	display: flex;
	margin: 30rpx 32rpx 60rpx 46rpx;
	align-items: center;
}
.list-music-top {
	width: 58rpx;
}
.list-music-song {
	flex: 1;
}
.list-music-song view:nth-child(1) {
	font-size: 28rpx;
	color: black;
	width: 55vw;
}
.list-music-song view:nth-child(2) {
	font-size: 20rpx;
	color: #c7c7c7;
	margin-top: 5rpx;
	flex-shrink: 0;
}
.list-music-song text {
	font-size: 50rpx;
}
</style>
