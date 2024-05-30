<template>
  <v-card color="secondary" class="px-2 py-2 mt-5 mx-5">
    <div ref="plotCard" style="width: 100%; height: calc(100vh - 120px);">
      <div v-for="key in plotVersions" :key="key" id="plot"></div>
    </div>
  </v-card>

  <v-menu
      v-model="editPlotsMenu"
      :close-on-content-click="false"
      location="end"
  >
    <template v-slot:activator="{ props }">
      <v-btn icon style="position: absolute; bottom: calc(8vh + 8rem); right: 3vw;" rounded size="x-large"
          color="orange-accent-2"
          v-bind="props"
      >
        <v-icon>mdi-function-variant</v-icon>
        <v-tooltip
            activator="parent"
            location="top"
        >Изменение графиков</v-tooltip>
      </v-btn>
    </template>

    <v-card :min-width="$vuetify.display.smAndDown ? 95 + 'vw' : ($vuetify.display.mdAndUp ? 50 + 'vw' : 30 + 'vw')">
      <v-card-actions class="my-2">
        <v-spacer/>
        <v-btn variant="flat" color="info" @click="addPlot">Добавить график</v-btn>
        <v-spacer/>
      </v-card-actions>

      <v-divider class="mb-1" color="white"/>

      <v-list v-if="plotsList.length !== 0">
        <v-list-item v-for="(plot, key) in plotsList" :key="key">
          <v-row no-gutters justify="center" align="center" align-content="center">
            <v-col cols="12" sm="5" md="5">
              <v-text-field @change="updatePlots" prefix="y =" v-model="plot.fn"
                            label="Уравнение" hint="Пример: x^2" placeholder="x^2"/>
            </v-col>

            <v-col cols="6" sm="4" md="4" class="d-flex mx-2">
              <v-text-field style="width: 25px" @change="() => {plot.range = stringToRange(plot.rangeString); updatePlots();}" v-model="plot.rangeString"
                            label="Область определения" hint="Пример: -10≤x≤10" placeholder="-10≤x≤10"/>
            </v-col>

            <v-col cols="2" sm="1" md="1">
              <v-menu
                  v-model="plot.editColorMenu"
                  :close-on-content-click="false"
                  location="end"
              >
                <template v-slot:activator="{ props }">
                  <v-btn class="mb-7" icon rounded :color="plot.color" v-bind="props">
                    <v-icon>mdi-palette</v-icon>
                    <v-tooltip
                        activator="parent"
                        location="top"
                    >Изменить цвет графика</v-tooltip>
                  </v-btn>
                </template>

                <v-color-picker v-model="plot.color" @update:model-value="updatePlots" show-swatches></v-color-picker>
              </v-menu>
            </v-col>

            <v-col cols="2" sm="1" md="1">
              <v-btn class="ml-2 mb-7" color="error" @click="() => removePlot(key)" icon>
                <v-icon>mdi-delete-forever</v-icon>
                <v-tooltip
                    activator="parent"
                    location="top"
                >Удалить график</v-tooltip>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="mb-3" color="white"/>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup>
import functionPlot from "function-plot";
import {nextTick, onMounted, ref, watch, onUnmounted} from "vue";

const plotVersions = ref([1]);
const plotCard = ref(null);

const plotsList = ref([]);
const editPlotsMenu = ref(false);
const editPlotColorMenu = ref(false);

const rightCheckRegex = /[xX].*[<=>]+.*[0-9]/gm
const leftCheckRegex = /.*[0-9]*.+[<=>]*[xX]/gm
const numberRegex = /-?[0-9]/gm
const symbolRegex = /[<=>]+/gm

function stringToRange(stringRange) {
  let range = [-9000, 9000]

  if (leftCheckRegex.test(stringRange)) {
    let leftString = stringRange.match(leftCheckRegex).join('')
    let leftNumber = Number.parseInt(leftString.match(numberRegex).join(''));
    let leftSymbol = leftString.match(symbolRegex).join('');

    switch (leftSymbol) {
      case ">":
        range[1] = leftNumber-1;
        break;
      case "=>":
      case ">=":
        range[1] = leftNumber;
        break;
      case "<":
        range[0] = leftNumber+1;
        break;
      case "≤":
      case "<=":
      case "=<":
        range[0] = leftNumber;
        break;
    }
  }

  if (rightCheckRegex.test(stringRange)) {
    let rightString = stringRange.match(rightCheckRegex).join('')
    let rightNumber = Number.parseInt(rightString.match(numberRegex).join(''));
    let rightSymbol = rightString.match(symbolRegex).join('');

    switch (rightSymbol) {
      case ">":
        range[0] = rightNumber+1;
        break;
      case "=>":
      case ">=":
        range[0] = rightNumber;
        break;
      case "<":
        range[1] = rightNumber-1;
        break;
      case "≤":
      case "<=":
      case "=<":
        range[1] = rightNumber;
        break;
    }
  }

  if (range[0] === -9000 && range[1] === 9000)
    range = null;

  return range;
}

function addPlot() {
  plotsList.value.push({
    fn: "x*2",
    range: [-10, 10],
    rangeString: "-10<x<10",
    editColorMenu: false
  })

  updatePlots();
}

function removePlot(index) {
  plotsList.value.splice(index, 1);

  resetPlots();
}

function resetPlots() {
  plotVersions.value.splice(0, 1);

  nextTick(() => {
    plotVersions.value.push(Math.random()+Math.random());
    updatePlots();
  })
}

function updatePlots() {
  nextTick(() => {
    let width = plotCard.value.clientWidth;
    let height = plotCard.value.clientHeight;

    functionPlot({
      target: "#plot",
      width,
      height,
      yAxis: {domain: [-10, 10]},
      xAxis: {domain: [-10, 10]},
      grid: true,
      data: plotsList.value
    });
  })
}

onMounted(() => {
  window.addEventListener("resize", updatePlots);
  updatePlots();
})

onUnmounted(() => {
  window.removeEventListener("resize", updatePlots);
})
</script>

<style scoped>

</style>