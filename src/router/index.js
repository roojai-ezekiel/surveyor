import Vue from 'vue'
import Router from 'vue-router'
import Global from '@/components/GlobalVariable'
import SigninOTP from '@/components/SigninOTP'
import MainMenu from '@/components/MainMenu'
import Working from '@/components/Working'
import History from '@/components/History'
import More from '@/components/More'
import SurveyorForm from '@/components/surveyorForm'
import FileUpload from '@/components/FileUpload'
import WorkActive from '@/components/WorkActive'
import GarageCall from '@/components/GarageCall'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'SigninOTP',
            component: SigninOTP
        },
        {
            path: '/mainmenu',
            name: 'MainMenu',
            component: MainMenu
        },
        {
            path: '/working',
            name: 'Working',
            component: Working
        },
        {
            path: '/history',
            name: 'History',
            component: History
        },
        {
            path: '/more',
            name: 'More',
            component: More
        },
        {
            path: '/surveyorform',
            name: 'SurveyorForm',
            component: SurveyorForm
        },
        {
            path: '/fileupload',
            name: 'FileUpload',
            component: FileUpload 
        },
        {
            path: '/workactive',
            name: 'WorkActive',
            component: WorkActive 
        },
        {
            path: '/garagecall',
            name: 'GarageCall',
            component: GarageCall 
        }
    ]
})
