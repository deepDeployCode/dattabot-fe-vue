import vue from "vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

vue.mixin({
  methods: {
    errorHandler(error, defaultMsg = "Gagal, Silahkan coba lagi nanti") {
      const { data } = error.response;
      if (error.response.status === 422 && data?.errors?.length) {
        const self = this;
        data.errors.forEach((err, i) => {
          setTimeout(() => {
            self.$toast({
              component: ToastificationContent,
              props: {
                title: err.message,
                icon: "AlertCircleIcon",
                variant: "danger",
                setTimeout: "5000",
              },
            });
          }, 3000 * i);
        });
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: data?.message || defaultMsg,
            icon: "AlertCircleIcon",
            variant: "danger",
          },
        });
      }
    },
    successHandler(title = "data berhasil") {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          icon: "CheckIcon",
          variant: "success",
        },
      });
    },
  },
});
