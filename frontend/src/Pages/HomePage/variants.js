export const boxContainerVariant = {
  hidden: {
    y: "10vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

export const containerVariant = {
  hidden: {
    y: "10vh",
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.8,
    },
  },
};
