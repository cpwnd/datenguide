import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import background from '../assets/hero_city.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '500px',
    fontSize: theme.typography.subtitle2.fontSize,
    backgroundColor: '#c3e5f1',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),
    borderBottom: '1px solid',

    [theme.breakpoints.up('sm')]: {
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '560px auto',
      backgroundPosition: '100% bottom',
      paddingBottom: theme.spacing(38),
    },

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      paddingBottom: theme.spacing(4),
      backgroundPosition: '105% bottom',
    },

    [theme.breakpoints.up('xl')]: {
      backgroundSize: '560px auto',
      backgroundPosition: '80% bottom',
    },
  },

  content: {
    '& p': {
      marginTop: '0',
      marginBottom: theme.spacing(2),
    },

    '& h1': {
      marginBottom: theme.spacing(2),
      color: theme.palette.secondary.dark,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.h1.fontSize,
      },
    },

    '& strong': {
      color: theme.palette.secondary.dark,
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '620px',
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '780px',
    },
  },

  cta: {
    margin: theme.spacing(2, 2, 0, 0),
    fontSize: theme.typography.body2.fontSize,
  },
}))

const MainStage = ({ children }) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container>
        <div className={classes.content}>{children}</div>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className={classes.cta}
          disableElevation
          href="/statistiken"
        >
          Datenportal
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          className={classes.cta}
          href="/statistik-erklaert"
        >
          Statistik erklärt
        </Button>
      </Container>
    </section>
  )
}

export default MainStage
