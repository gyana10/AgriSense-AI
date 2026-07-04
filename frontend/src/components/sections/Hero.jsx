function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[90vh] items-center justify-center bg-slate-50"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h1 className="text-6xl font-extrabold leading-tight">

          Precision Agriculture

          <span className="block text-green-600">
            Powered by AI
          </span>

        </h1>

        <p className="mt-6 text-xl text-slate-600">

          Empowering farmers with Machine Learning,
          Computer Vision,
          Weather Intelligence,
          and AI-powered recommendations.

        </p>

        <div className="mt-10 flex justify-center gap-4">

          <button className="rounded-xl bg-green-600 px-8 py-4 text-white hover:bg-green-700">

            Explore Platform

          </button>

          <button className="rounded-xl border border-green-600 px-8 py-4 text-green-700 hover:bg-green-100">

            Learn More

          </button>

        </div>

      </div>
    </section>
  );
}

export default Hero;