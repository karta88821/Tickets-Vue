<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
	export default {
		name: "App",
		watch: {
			// 利用watch來監聽全局的route(newRoute, oldRoute)

			// 處理當user直接輸入url的情況，我們要加入對應的tab並顯示出來
			// login的畫面沒有tab，所以不需要
			$route(to, from) {
				if (to.path != '/login') {
					let obj = {
						name: to.name,
						title: to.meta.title
					}
					this.$store.commit("addTab", obj)
				}
			}
		}
	};
</script>


<style>
html,
body,
#app {
    font-family: "Helvetica Neue", "Hiragino Sans GB", "WenQuanYi Micro Hei",
        "Microsoft Yahei", sans-serif;
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 15px;
}
</style>
