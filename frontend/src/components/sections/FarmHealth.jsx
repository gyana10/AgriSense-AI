import Card from "../common/Card";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function FarmHealth() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionTitle
          title="Farm Health Score"
          subtitle="A unified AI-powered overview of your farm's current condition."
        />

        <Card>
          <div className="grid gap-10 md:grid-cols-2">

            <div className="flex flex-col items-center justify-center">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border-8 border-green-600">
                <span className="text-5xl font-bold text-green-600">
                  91
                </span>
              </div>

              <p className="mt-4 text-lg font-semibold text-slate-700">
                Overall Health Score
              </p>
            </div>

            <div>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Crop Suitability</span>
                  <span className="font-bold text-green-600">
                    98%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Soil Fertility</span>
                  <span className="font-bold text-green-600">
                    85%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Disease Risk</span>
                  <span className="font-bold text-yellow-500">
                    Low
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Pest Risk</span>
                  <span className="font-bold text-green-600">
                    Very Low
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Expected Yield</span>
                  <span className="font-bold">
                    7.3 t/ha
                  </span>
                </div>

              </div>

              <hr className="my-8" />

              <h3 className="text-xl font-bold">
                Recommended Actions
              </h3>

              <ul className="mt-4 space-y-3 text-slate-600">
                <li>✔ Apply Potassium fertilizer</li>
                <li>✔ Irrigate tomorrow at 6 AM</li>
                <li>✔ Monitor for Fall Armyworm</li>
              </ul>

            </div>

          </div>
        </Card>
      </Container>
    </section>
  );
}

export default FarmHealth;