<template>
	<!-- 头部 -->
	<view class="music-head" :style="{color:color}">
		<!-- 返回  和  返回首页 -->
		<view class="music-head-icon" v-if="icon">
			<text class="iconfont icon-changyongtubiao-fuben-24" @tap="handletovack"></text>|<text class="iconfont icon-shouye"@tap="handletohome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props:["title","icon",'color'],
		methods:{
			handletovack(){
				uni.navigateBack();
			},
			handletohome(){
				uni.navigateTo({
					url: '/pages/index/index',
				});
			},
		}
	}
</script>

<style scoped>
.music-head{width: 100%; height: 75px; font-size: 16px; line-height: 80px; text-align: center; color: black; position: relative;} 
.music-head-icon{position: absolute; display: flex; justify-content: space-evenly; left: 8px; top: 26px; width: 90px; height: 30px; line-height: 31px; border-radius: 15px; background-color: rgba(0,0,0,0.4); color: white;}
</style>
