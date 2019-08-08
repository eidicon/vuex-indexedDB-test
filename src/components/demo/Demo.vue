<template>
  <div>
    <div v-for="(dbItem, index) in getObject" :key="index">
      {{dbItem}}
      <button :id="dbItem.id" @click="handleRemoveItem">Remove</button>
    </div>

    <form @submit.prevent="submit">
      <label for="key">
        key
        <input type="text" id="key" v-model="itemKey" />
      </label>

      <label for="value">
        value
        <input type="text" id="value" v-model="itemValue" />
      </label>

      <button type="submit">Save item</button>
    </form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Action, State, Getter } from "vuex-class";
import { IMainActions, IPayload } from "@/store/modules/main/actions";

@Component({})
export default class Demo extends Vue {
  @Action("main/checkStorage") checkStorage!: IMainActions["checkStorage"];
  @Action("main/saveItem") saveItem!: IMainActions["saveItem"];
  @Action("main/removeItem") removeItem!: IMainActions["removeItem"];
  @Getter("main/getObject") getObject!: IPayload;

  private itemKey: string = "";
  private itemValue: string = "";

  async mounted() {
    await this.checkStorage();
  }

  handleRemoveItem(event: any) {
    if (event) {
      const element = event.target as HTMLElement
      this.removeItem(Number.parseInt(element.id));
    }
  }

  submit() {
    this.saveItem({ itemKey: this.itemKey, itemValue: this.itemValue });
    this.itemKey = '';
    this.itemValue = '';
  }
}
</script>