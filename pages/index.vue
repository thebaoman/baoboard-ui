<template>
  <div>
    <v-row justify="center" align="center" class="mt-5">
      <v-col cols="12" md="6" lg="4">
        <v-card class="top-card secondary pa-4 rounded-lg" elevation="5">
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img src="/lotus.png" max-width="140" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <div class="grey--text sub-title logo-title mb-3">
                  Total Value Locked
                </div>
                <div class="value">
                  <v-skeleton-loader
                    v-if="!tvl"
                    type="sentences"
                    width="100%"
                  />
                  <animated-number
                    v-else
                    :value="tvl"
                    :format-value="formatterPrice2Dec.format"
                    :duration="500"
                  />
                </div>
              </v-list-item-title>
              <v-list-item-subtitle class="mt-4">
                <span v-if="market_details">
                  24 HR Trade Vol:
                  <animated-number
                    :value="market_details.market_data.total_volume.usd"
                    :format-value="formatterPrice.format"
                    :duration="500"
                  />
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="top-card secondary pa-4  rounded-lg" elevation="5">
          <v-list-item>
            <v-list-item-avatar size="80">
              <v-img src="/pizza.png" max-width="140" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <div class="grey--text sub-title logo-title mb-3">
                  Market Cap
                </div>
                <div class="value">
                  <v-skeleton-loader
                    v-if="!market_details"
                    type="sentences"
                    width="100%"
                  />
                  <animated-number
                    v-else
                    :value="market_details.market_data.market_cap.usd"
                    :format-value="formatterPrice.format"
                    :duration="200"
                  />
                  <span
                    v-if="market_details"
                    style="font-size:1rem"
                    :class="market_details.market_data.market_cap_change_percentage_24h>=0? 'green--text':'red--text'"
                  >
                    {{ market_details.market_data.market_cap_change_percentage_24h>=0? '+':'-' }}
                    {{ market_details.market_data.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </div>
              </v-list-item-title>
              <v-list-item-subtitle class="mt-4">
                <span v-if="market_details">
                  Supp:
                  <animated-number
                    :value="market_details.market_data.circulating_supply"
                    :format-value="formatter.format"
                    :duration="500"
                  />
                  /
                  <animated-number
                    :value="market_details.market_data.total_supply"
                    :format-value="formatter.format"
                    :duration="500"
                  />
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="top-card secondary pa-4 rounded-lg" elevation="5">
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img src="/bao-icon.png" max-width="140" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <div class="grey--text sub-title logo-title mb-3">
                  Bao Token Price
                </div>
                <div class="value">
                  <v-skeleton-loader
                    v-if="!current_price"
                    type="sentences"
                    width="100%"
                  />
                  <animated-number
                    v-else
                    :value="current_price"
                    :format-value="formatterPrice.format"
                    :duration="500"
                  />
                  <span
                    v-if="market_details"
                    style="font-size:1rem"
                    :class="market_details.market_data.price_change_percentage_24h>=0? 'green--text':'red--text'"
                  >
                    {{ market_details.market_data.price_change_percentage_24h>=0? '+':'-' }}
                    {{ market_details.market_data.price_change_percentage_24h.toFixed(2) }}%
                  </span>
                </div>
              </v-list-item-title>
              <v-list-item-subtitle class="mt-4">
                <span v-if="market_details">
                  24 HR:
                  <v-icon class="red--text">
                    mdi-arrow-down
                  </v-icon>
                  <animated-number
                    :value="market_details.market_data.low_24h.usd"
                    :format-value="formatterPrice.format"
                    :duration="500"
                  />
                  <v-icon class="green--text">
                    mdi-arrow-up
                  </v-icon>
                  <animated-number
                    :value="market_details.market_data.high_24h.usd"
                    :format-value="formatterPrice.format"
                    :duration="500"
                  />
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="secondary">
          <v-card-title class="h-title">
            <v-img src="/buns.png" max-width="100" alt="" class="mr-2" /> ({{farms.length}}) Dim Sum Entrees
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="toggle_one"
              class="secondary"
              rounded
              mandatory
            >
              <v-btn>
                All
              </v-btn>

              <v-btn>
                <v-img src="/uniswap.png" max-width="30" class="mr-1"/>
                Uniswap
              </v-btn>

              <v-btn>
                <v-img src="/sushiswap.png" max-width="30" class="mr-1"/>
                Sushiswap
              </v-btn>

            </v-btn-toggle>
          </v-card-title>
          <v-data-table
            class="secondary"
            :headers="headers"
            :items="filteredFarm? filteredFarm:[]"
            :loading="!filteredFarm.length"
            :search="search"
            :items-per-page="-1"
            :footer-props="{'items-per-page-options':[]}"
            :hide-default-footer="true"
            disable-pagination
          >
            <template v-slot:[`item.icon`]="{ item }">
              <v-avatar size="60" style="box-shadow: 0 8px 6px -6px black;">
                <img :src="item.icon" class="pa-2" width="100" />
              </v-avatar>
            </template>

            <template v-slot:[`item.is_uniswap`]="{ item }">
              <v-img v-if="item.is_uniswap" src="/uniswap.png" max-width="25" />
              <v-img v-else src="/sushiswap.png" class="pa-3" max-width="35" />
            </template>

            <template v-slot:[`item.name`]="{ item }">
              <span>
                {{item.name}} <a class="text-decoration-none" :href="item.farm_link" target="_blank"><v-icon size="20">mdi-open-in-new</v-icon></a>
              </span>
              <br>
              <span class="grey--text">
                {{item.symbol}}
              </span>
            </template>
            <template v-slot:[`item.token1_amt`]="{ item }">
                 <animated-number
                   :value="getStakedValue(item)"
                   :format-value="formatterPrice2Dec.format"
                   :duration="500"
                 />
            </template>
            <template v-slot:[`item.staked`]="{ item }">
              <span>
                  <animated-number
                    :value="item.token0_amt"
                    :format-value="formatterDec.format"
                    :duration="500"
                  /> {{ getLPtokenName(0,item.symbol) }}
              </span>
              <br>
              <span>
                  <animated-number
                    :value="item.token1_amt"
                    :format-value="formatterDec.format"
                    :duration="500"
                  /> {{ getLPtokenName(1,item.symbol) }}
              </span>
            </template>
            <template v-slot:[`item.apy_yearly`]="{ item }">
              <span>
                {{item.apy_yearly}}% &nbsp;(1y)
              </span>
              <br>
              <span class="grey--text">
                {{item.apy_monthly}}% &nbsp;(1m)
              </span>
              <br>
              <span class="grey--text">
                {{item.apy_daily}}% &nbsp;(1d)
              </span>
            </template>
            <template v-slot:[`item.lp_owned`]="{ item }">
              <span>
                {{ (item.lp_owned * 100).toFixed(2)}}%
              </span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import AnimatedNumber from 'animated-number-vue'
import { getBaoMarket, getFarms, getPrices } from '~/plugins/helper'

export default {
  components: {
    AnimatedNumber
  },
  data () {
    return {
      toggle_one: null,
      headers: [
        {
          text: '',
          align: 'start',
          value: 'icon'
        },
        {
          text: 'AMM',
          align: 'start',
          value: 'is_uniswap'
        },
        {
          text: 'Farm',
          align: 'start',
          value: 'name',
          filterable: true
        },
        {
          text: 'Stake Value',
          align: 'start',
          value: 'token1_amt'
        },
        {
          text: 'Staked',
          align: 'start',
          value: 'staked'
        },
        {
          text: 'ROI',
          align: 'start',
          value: 'apy_yearly',
          filterable: true
        },
        {
          text: 'Overall LP staked',
          align: 'start',
          value: 'lp_owned',
          filterable: true
        }
      ],
      farms: [],
      search: '',
      formatter: new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }),
      formatterDec: new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      formatterPrice: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      }),
      formatterPrice2Dec: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      market_details: null,
      current_price: 0,
      weth_price: 0,
      usdc_price: 0,
      prices_table: {},
      sushiFarms: [],
      uniFarms: []
    }
  },
  async mounted () {
    this.market_details = await getBaoMarket()
    this.current_price = this.market_details.market_data.current_price.usd
    const prices = await getPrices()
    this.prices_table.usdc = prices['usd-coin'].usd
    this.prices_table.eth = prices.weth.usd
    this.prices_table.yfi = prices['yearn-finance'].usd
    this.prices_table.xsushi = prices.xsushi.usd
    this.prices_table.sushi = prices.sushi.usd
    this.prices_table.dai = prices.dai.usd
    this.farms = await getFarms()
    this.initFarms()
  },
  computed: {
    tvl () {
      let tvl = 0
      if (this.farms.length) {
        for (const idx in this.farms) {
          tvl += this.getStakedValue(this.farms[idx])
        }
      }
      return tvl
    },
    filteredFarm () {
      if (this.toggle_one === 0) {
        return this.farms
      } else if (this.toggle_one === 1) {
        return this.uniFarms
      } else {
        return this.sushiFarms
      }
    }
  },
  methods: {
    getLPtokenName (order, symbol) {
      if (symbol.toLowerCase() in this.prices_table) {
        return symbol.toLowerCase()
      }
      const s = symbol.split(' ')
      const arr = s[0].split('-')
      return order in arr ? arr[order] : arr[0]
    },
    getStakedValue (farm) {
      const tokenName = this.getLPtokenName(1, farm.symbol)
      const multiplier = !farm.token1_address ? 1 : 2
      const tokenAmt = !farm.token1_address ? farm.token0_amt : farm.token1_amt
      return parseFloat(this.prices_table[tokenName.toLowerCase()]) * tokenAmt * multiplier
    },
    initFarms () {
      for (const idx in this.farms) {
        const value = this.farms[idx]
        if (!value.is_uniswap) {
          this.sushiFarms.push(value)
        } else if (value.is_uniswap) {
          this.uniFarms.push(value)
        }
      }
    }
  }
}
</script>
<style scoped>
  .top-card {
    min-height: 170px;
  }
  .value {
    font-size: 1.95rem
  }
  .h-title {
    font-size: 2.45rem;
    font-family: 'Permanent Marker', monospace;
  }
</style>
