import useTitle from "../hooks/useTitle";

const Terms = () => {
  useTitle("LifeLessons – Terms & Conditions");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink">Terms &amp; Conditions</h1>
      <p className="mt-4 text-gray-600">
        LifeLessons is a student project. By using it, you agree to the simple
        rules below.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink">Your lessons</h2>
      <p className="mt-2 text-gray-600">
        You own the lessons you write. Public lessons can be read by anyone,
        and Premium lessons can be read by Premium members. You can change or
        delete your lessons at any time.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink">Respect others</h2>
      <p className="mt-2 text-gray-600">
        Do not post hateful, harassing, misleading or harmful content. Lessons
        that are reported may be reviewed and removed by an administrator.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink">Premium plan</h2>
      <p className="mt-2 text-gray-600">
        Premium is a one-time payment that unlocks Premium lessons for your
        account. Payments on this project run in Stripe test mode, and no real
        money is charged.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink">Your data</h2>
      <p className="mt-2 text-gray-600">
        We store your name, email, profile photo link, lessons, comments and
        saved lessons so the site can work. We do not sell your information.
      </p>
    </div>
  );
};

export default Terms;