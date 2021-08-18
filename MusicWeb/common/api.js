import {baseUrl} from './config.js'

export function topList(){
	let listIds=['3','0','2','1']
	return new  Promise(function(reslove,reject){
		uni.request({
			 	url:`${baseUrl}/toplist/detail`,
				method:'GET',
				data:{},
				success:res=>{
					console.log(res)
					let result=res.data.list;
					result.length=4;
					for(var i=0;i<listIds.length;i++){
						result[i].listId=listIds[i]
					}
					reslove(result)
				},
				fail:()=>{},
				complete: () => {}
			 })
		})
	}
		
export function list(listId){
   return	uni.request({
		url: `${baseUrl}/top/list?idx=${listId}`,
		method: 'GET',
	});
}

// http://localhost:3000/song/detail?ids=483937795
export function songDetail(songId){
	return uni.request({
		url:`${baseUrl}/song/detail?ids=${songId}`,
		 method:'GET'
	})
}

// http://localhost:3000/lyric?id=483937795
export function songLyric(songId){
	return uni.request({
		url:`${baseUrl}/lyric?id=${songId}`,
		 method:'GET'
	})
}

// http://localhost:3000/song/url?id=483937795
export function songurl(songId){
	return uni.request({
		url:`${baseUrl}/song/url?id=${songId}`,
		 method:'GET'
	})
}

