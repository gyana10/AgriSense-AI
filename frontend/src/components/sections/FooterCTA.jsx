import Button from "../common/Button";
import Container from "../common/Container";

function FooterCTA() {
  return (
    <section className="bg-green-700 py-20 text-white">
      <Container>
        <div className="text-center">

          <h2 className="text-5xl font-bold">
            Ready to Transform Your Farming?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-green-100">
            Join AgriSense AI and leverage Artificial Intelligence,
            Machine Learning, Weather Intelligence and Computer Vision
            to improve crop productivity.
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <Button className="bg-white text-green-700 hover:bg-green-100">
              Get Started
            </Button>

            <Button
              variant="outline"
              className="border-white text-white hover:bg-green-600"
            >
              View Documentation
            </Button>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default FooterCTA;