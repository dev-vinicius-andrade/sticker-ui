<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col cols="8">
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title> Authorized </v-list-item-title>

                {{ JSON.stringify(authorized) }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title> Unauthorized </v-list-item-title>

                {{ unauthorized }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title> Current Token </v-list-item-title>

                <v-text-field
                  :value="currentToken"
                  append-icon="mdi-content-copy"
                  @click:append="copyToClipboard"
                >
                </v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- <v-card-title>{{$store.getters['module_configurations/getProfessionalData'].job.description}}</v-card-title>
            <v-card-subtitle>{{$store.getters['module_configurations/getProfessionalData'].name}}</v-card-subtitle>
            <v-card-text>
                <v-row no-gutters align="center" justify="center">
                  <v-col cols="12" lg="5" xl="3"  style="text-align:center;" >
                      <v-avatar class="profile" :size="avatarSize" :max-height="avatarSize" :max-width="avatarSize" >
                          <v-img src="/image/avatar/avatar.svg"></v-img>
                      </v-avatar>
                  </v-col>
                  <v-col cols="12" lg="7" xl="9"  >
                    <pre class="pre-inherited" >
                      {{$t("texts.summary")}}
                    </pre>
                  </v-col>
                </v-row>
              </v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {},
  computed: {
    breakPoint() {
      return this.$vuetify.breakpoint.name;
    },
    avatarSize() {
      return "256px";
    },
  },
  data() {
    return {
      authorized: [],
      unauthorized: [],
    };
  },
  computed: {
    currentToken() {
      return this.$store.getters["module_authentication/token"];
    },
  },
  async mounted() {
    await this.getAuthorized();
    await this.getUnauthorized();
  },
  methods: {
    copyToClipboard() {
      this.$utils.copyToClipboard(this.currentToken);
    },
    async getAuthorized() {
      try {
        const authorized = await axios.get(
          "https://localhost:7207/authorized",
          {
            headers: {
              Authorization:
                "Bearer " + this.$store.getters["module_authentication/token"],
            },
          }
        );
        this.authorized = authorized.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUnauthorized() {
      try {
        const unauthorized = await axios.get(
          "https://localhost:7207/unauthorized"
        );
        this.unauthorized = unauthorized.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style></style>
