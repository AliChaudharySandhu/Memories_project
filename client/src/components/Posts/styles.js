import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  loading:{
    display: 'flex',
    width: '100%',
    height: '80vh',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));