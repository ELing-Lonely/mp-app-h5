<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      // 初始化获取硬件信息
			this.$store.dispatch('app/getSystemInfo')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.page{
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;
		overflow: hidden;
	}
</style>
