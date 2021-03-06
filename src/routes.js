import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Index from './views/index.vue'
import Home from './views/Home.vue'
// 投放管理
import launchUpdatePackage from './views/launch/updatePackage.vue'
import launchRevoke from './views/launch/launchRevoke.vue'
import launchVoiceResource from './views/launch/voiceResource.vue'
// 配置管理
import configControlUrlParams from './views/configure/controlUrlParams.vue'
import configVersionLimit from './views/configure/versionLimit.vue'
import configDrive from './views/configure/drive.vue'
import configCloseOperation from './views/configure/closeOperation.vue'
import configApplication from './views/configure/application.vue'
import configLockScreen from './views/configure/lockScreen.vue'
import configAdWallpaper from './views/configure/adWallpaper.vue'
// 公告管理
import noticeAnnouncement from './views/notice/announcement.vue'
import noticeList from './views/notice/list.vue'
// 系统管理
import systemUsers from './views/system/users.vue'

var isHiddenMenu = (item) => {
    if(!item.isMenu) { // 非菜单默认隐藏
        return true;
    }

    var is_hidden = true;
    for (var i = 0; i < item.children.length; i++) {
        let child = item.children[i];
        if(!child.hidden(child.path)) {
            is_hidden = false;
            break;
        }
    }

    return is_hidden;
};

var isHiddenMenuChildren = (key) => {
    let userinfo = JSON.parse(sessionStorage.getItem('user')),
        authority = userinfo.group_authority ? JSON.parse(userinfo.group_authority) : [];

    return authority.indexOf(key) < 0;
};

let def_pages = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: isHiddenMenu
    }, {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: isHiddenMenu
    }, {
        path: '/index', // 初始页
        component: Index,
        hidden: isHiddenMenu
    }],
    not_page = [{
        path: '*',
        hidden: isHiddenMenu,
        redirect: { path: '/404' }
    }];

// 菜单路由配置
let menu_pages = [{
    path: '',
    component: Home,
    name: '投放管理',
    isMenu: true,
    hidden: isHiddenMenu,
    iconCls: 'el-icon-sold-out',
    children: [
        { path: '/launchUpdatePackage', component: launchUpdatePackage, name: '更新包清单', hidden: isHiddenMenuChildren },
        { path: '/launchRevoke', component: launchRevoke, name: '投放/撤消', hidden: isHiddenMenuChildren },
        { path: '/launchVoiceResource', component: launchVoiceResource, name: '语音资源', hidden: isHiddenMenuChildren },
    ]
}, {
    path: '',
    component: Home,
    name: '配置管理',
    isMenu: true,
    hidden: isHiddenMenu,
    iconCls: 'el-icon-document',
    children: [
        { path: '/configControlUrlParams', component: configControlUrlParams, name: '控制台URL参数', hidden: isHiddenMenuChildren },
        { path: '/configVersionLimit', component: configVersionLimit, name: '版本限制', hidden: isHiddenMenuChildren },
        { path: '/configDrive', component: configDrive, name: '驱动配置', hidden: isHiddenMenuChildren },
        { path: '/configCloseOperation', component: configCloseOperation, name: '关闭操作', hidden: isHiddenMenuChildren },
        { path: '/configApplication', component: configApplication, name: '应用配置', hidden: isHiddenMenuChildren },
        { path: '/configLockScreen', component: configLockScreen, name: '锁屏界面', hidden: isHiddenMenuChildren },
        { path: '/configAdWallpaper', component: configAdWallpaper, name: '广告壁纸', hidden: isHiddenMenuChildren },
    ]
}, {
    path: '',
    component: Home,
    name: '公告管理',
    isMenu: true,
    hidden: isHiddenMenu,
    iconCls: 'el-icon-bell',
    children: [
        { path: '/noticeAnnouncement', component: noticeAnnouncement, name: '公告发布', hidden: isHiddenMenuChildren },
        { path: '/noticeList', component: noticeList, name: '公告列表', hidden: isHiddenMenuChildren },
    ]
}, {
    path: '',
    component: Home,
    name: '系统管理',
    isMenu: true,
    hidden: isHiddenMenu,
    iconCls: 'el-icon-setting',
    children: [
        { path: '/systemUsers', component: systemUsers, name: '用户管理', hidden: isHiddenMenuChildren },
    ]
}];

import comm from './common/js/comm'
let routes = comm.mergeArr(def_pages, menu_pages, not_page);

export default routes;
