import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//     navDisplayFlex: {
//       display: `flex`,
//       justifyContent: `space-between`,
//     },
//     linkText: {
//       textDecoration: `none`,
//       textTransform: `uppercase`,
//       color: `white`,
//     },
//     navbarDisplayFlex: {
//       display: `flex`,
//       justifyContent: `space-between`,
//     },
//   });

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
        minWidth: 650,
      },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
      },
      linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`,
      },
      navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
      },
  })
);

  export default useStyles;