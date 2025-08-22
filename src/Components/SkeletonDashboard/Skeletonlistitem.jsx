import React from 'react'

import charticon from '../../assets/static/Chart.svg'
import charticongreen from '../../assets/static/Chartgreen.svg'
import dangertriangleicon from '../../assets/static/Dangertriangle.svg'
import dangertriangleicongreen from '../../assets/static/Dangertrianglegreen.svg'
import datasetsicon from '../../assets/static/Datasets.svg'
import datasetsicongreen from '../../assets/static/Datasetsgreen.svg'
import rocketicon from '../../assets/static/Rocket.svg'
import rocketicongreen from '../../assets/static/Rocketgreen.svg'
import settingicon from '../../assets/static/Setting.svg'
import settingicongreen from '../../assets/static/Settinggreen.svg'
import usersquareicon from '../../assets/static/user-square.svg'
import usersquareicongreen from '../../assets/static/user-squaregreen.svg'
import offercentericongreen from '../../assets/static/offercentergreen.svg'
import offercentericon from '../../assets/static/offercenter.svg'
import simsell from '../../assets/static/sellsim.svg'
import simsellwhite from '../../assets/static/sellsimwhite.svg'
import deliverysent from '../../assets/static/deliveredsent.svg'
import deliveredsentgreen from '../../assets/static/deliveredsentgreen.svg'
import transgreen from '../../assets/static/trandsactiongreen.svg'
import transwhite from '../../assets/static/trandsactionwhite.svg'
import balancegreen from '../../assets/static/balancegreen.svg'
import balancewhite from '../../assets/static/balancewhite.svg'
import contactimg from '../../assets/static/contact-book.svg'
export const dataset=[
    {
    'img':charticon,
    'imgsec':charticongreen,
    'name':'Dashboard',
    'menu':[],
    'code':0
     },
     {
        'img':datasetsicon,
         'imgsec':datasetsicongreen,
        'name':'Sim Inventory',
        'menu':['Operators','SIM List' ,'Sim request'],
        'code':1
            }, 
                 {
                                'img':dangertriangleicon,
                                'imgsec':dangertriangleicongreen,
                                'name':'Users',
                                'menu':['Group List','User List','Agent List','Agent Request'],
                                'code':4
                                    },  
                                    {
                                        'img':offercentericon,
                                        'imgsec':offercentericongreen,
                                        'name':'Offer Center',
                                        'menu':[],
                                        'code':6
                                            }, 
                                            {
                                                'img':simsellwhite,
                                                'imgsec':simsell,
                                                'name':'Sell sim card',
                                                'menu':['Sim list','Activation'],
                                                'code':7
                                                    }, 
                                                    {
                                                        'img':simsellwhite,
                                                        'imgsec':simsell,
                                                        'name':'Activation',
                                                        'menu':[],
                                                        'code':8
                                                            }, 
                                                            {
                                                                'img':deliverysent,
                                                                 'imgsec':deliveredsentgreen,
                                                                'name':'Courier',
                                                                'menu':['Courier list','Price & Commission'], 
                                                                'code':2
                                                                    },  

                                                                    {
                                                                        'img':balancewhite,
                                                                        'imgsec':balancegreen,
                                                                        'name':'Finance report',
                                                                        'menu':['Balance sheet'
                                                                            // ,'Transection'
                                                                        ],
                                                                        'code':9
                                                                            }, 
                                    {
                                        'img':settingicon,
                                        'imgsec':settingicongreen,
                                        'name':'Settings',
                                        'menu':[],
                                        'code':5
                                            }, {
                                        'img':settingicon,
                                        'imgsec':settingicongreen,
                                        'name':'Report & History',
                                        'menu':[],
                                        'code':10
                                            },
     {
                                        'img':contactimg,
                                        'imgsec':contactimg,
                                        'name':'Contact Us',
                                        'menu':[],
                                        'code':11
                                            },


]



