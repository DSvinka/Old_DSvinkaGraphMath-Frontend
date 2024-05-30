import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md3 } from 'vuetify/blueprints'

import colors from 'vuetify/lib/util/colors'

export default createVuetify({
    blueprint: md3,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {mdi}
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                dark: true,
                colors: {
                    primary: "#c39068",
                    secondary: "#c6d2e6",

                    background: "#141e2a",
                    surface: "#253850",

                    info: "#0191f7",
                    error: "#e94f31",
                    success: "#1fb973",
                    warning: "#f0ae2d",

                }
            }
        }
    }
})