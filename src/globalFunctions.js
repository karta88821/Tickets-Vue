

import Vue from "vue"

Vue.mixin({
	methods: {
		hasAuth(role) {
			let permissions = this.$store.state.menus.permissionList
			return permissions.indexOf(role) > -1
		}
	}
})