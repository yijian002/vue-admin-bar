<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed ? 'logo-collapse-width':'logo-width'">
                {{collapsed ? '' : sysName}}
            </el-col>
            <el-col :span="10">
                <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img class="userhead" /> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item>我的消息</el-dropdown-item> -->
                        <!-- <el-dropdown-item>设置</el-dropdown-item> -->
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router v-show="!collapsed" background-color="#f2f8ff" active-text-color="#409eff" style="width: auto;">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden(item)">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden(child.path)">{{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                    </template>
                </el-menu>
                <!--导航菜单-折叠后-->
                <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
                    <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden(item)" class="el-submenu item">
                        <template v-if="!item.leaf">
                            <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                                <li v-for="child in item.children" v-if="!child.hidden(child.path)" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
                            </ul>
                        </template>
                        <template v-else>
                            <li class="el-submenu">
                                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                            </li>
                        </template>
                    </li>
                </ul>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title" style="font-size: 18px;">{{$route.name}}</strong>
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched">{{ item.name }}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
            return {
                sysName: '网吧管家运营后台',
                collapsed: false,
                sysUserName: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect(a, b) {},
            //退出登录
            logout() {
                this.$confirm('确认退出吗?', '提示', {}).then(() => {
                    sessionStorage.removeItem('user');
                    this.$router.push('/login');
                });
            },
            collapse() {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.tuser_name || '';
            }
        }
}
</script>
<style>
.blue {
    color: #409EFF;
}
.green {
    color: #67c23a;
}
.red {
    color: #F56C6C;
}
.el-form-medium .el-textarea__inner {
    width: 100%;
    height: 150px;
}
.el-form-mini .el-textarea__inner {
    width: 100%;
    height: 80px;
}
.el-tooltip-red.is-light {
    color: red;
}
.el-dialog-form-textarea .el-textarea .el-textarea__inner {
    height: 80px;
    width: 100%;
    margin: 0;
}
.el-submenu__title {
    font-weight: bold;
}
</style>

<style scoped lang="scss">
@import '~scss_vars';
.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
        height: 60px;
        line-height: 60px;
        background: $color-primary;
        color: #fff;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
        .userhead {
            background: url(../assets/logo.png) no-repeat;
            background-size: 100% 100%;
        }
        .logo {
            height: 60px;
            font-size: 18px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 1px;
            border-right-style: solid;
            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }
            .txt {
                color: #fff;
            }
        }
        .logo-width {
            width: 230px;
        }
        .logo-collapse-width {
            width: 60px
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .main {
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
        aside {
            flex: 0 0 230px;
            width: 230px;
            .el-menu {
                height: 100%;
            }
            .collapsed {
                width: 60px;
                .item {
                    position: relative;
                }
                .submenu {
                    position: absolute;
                    top: 0px;
                    left: 60px;
                    z-index: 99999;
                    height: auto;
                    display: none;
                }
            }
        }
        .menu-collapsed {
            flex: 0 0 60px;
            width: 60px;
        }
        .menu-expanded {
            flex: 0 0 230px;
            width: 230px;
        }
        .content-container {
            flex: 1;
            overflow-y: scroll;
            padding: 20px;
            .breadcrumb-container {
                .title {
                    width: 200px;
                    float: left;
                    color: #409EFF;
                }
                .breadcrumb-inner {
                    float: right;
                }
            }
            .content-wrapper {
                background-color: #fff;
                box-sizing: border-box;
            }
        }
    }
}
</style>
