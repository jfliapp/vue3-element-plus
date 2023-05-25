<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <div>
                <keep-alive>
                    <router-view :key="key" />
                </keep-alive>
                <!-- <router-view v-if="!keepAliveFlag" :key="key" /> -->
            </div>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'twoLayout',
    data() {
        return {
            keepAliveFlag:true,
        }
    },
    computed: {
        key() {
            return this.$route.path
        }
    },
    watch:{
      $route(to,from){
        if (to.meta.hasOwnProperty('keepAliveFlag')){
            // 需要刷新
            this.keepAliveFlag = to.meta.keepAliveFlag
        } else {
            this.keepAliveFlag = false
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header + .app-main {
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px);
    }

    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
