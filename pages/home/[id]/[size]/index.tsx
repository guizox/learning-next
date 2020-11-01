import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import { GetStaticProps, GetStaticPaths } from "next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  menuButton: {},
});

type Props = {
  offers?: any;
  errors?: string;
};

const Home = ({ offers, errors }: Props) => {
  const classes = useStyles();

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Grid container spacing={2} justify="center">
      {offers?.map((item: any) => (
        <Grid item xs={3} key={item.id}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {item.id}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id || 1;
    const size = params?.size || 24;

    const buildUrl = (id: string, size: string) =>
      `https://api.sbwebservices.net/offer-query/offers/?portalId=[2,15]&locale=pt_BR&timeZoneId=America/Sao_Paulo&searchType=opened&filter=store.id:46;auction.modalityId:[1,4,5]&pageNumber=${id}&pageSize=${size}&orderBy=price:desc;visits:desc`;

    const response = await fetch(buildUrl(id as string, size as string));

    const { offers } = await response.json();

    return { props: { offers }, revalidate: 60 };
  } catch (err) {
    console.log(err);
    return { props: { errors: err.message } };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sizes = [12, 24, 36, 48, 60];
  const paths = sizes
    .map((size) =>
      [1, 2, 3, 4].map((item) => ({
        params: { id: item.toString(), size: size.toString() },
      }))
    )
    .reduce((acc, cur) => [...acc, ...cur], []);
  return { paths, fallback: true };
};

export default Home;
