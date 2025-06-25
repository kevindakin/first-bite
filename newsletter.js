function newsletterForms() {
  const forms = document.querySelectorAll('[data-form="klaviyo"]');
  const publicApiKey = "T6wHNs";
  const listId = "TVZZ7n";

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const success = form.querySelector(".w-form-done");
      const error = form.querySelector(".w-form-fail");
      const email = input?.value?.trim();
      if (!email) return;

      success?.style.setProperty("display", "none");
      error?.style.setProperty("display", "none");

      try {
        const res = await fetch(
          `https://a.klaviyo.com/client/subscriptions/?company_id=${publicApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/vnd.api+json",
              Revision: "2025-01-15",
            },
            body: JSON.stringify({
              data: {
                type: "subscription",
                attributes: {
                  profile: {
                    data: {
                      type: "profile",
                      attributes: { email },
                    },
                  },
                },
                relationships: {
                  list: { data: { type: "list", id: listId } },
                },
              },
            }),
          }
        );

        if (res.ok) {
          success?.style.setProperty("display", "block");
          setTimeout(() => {
            form.style.display = "none";
          }, 300);
        } else {
          console.error("Subscribe failed:", await res.text());
          error?.style.setProperty("display", "block");
        }
      } catch (err) {
        console.error("Klaviyo subscribe error:", err);
        error?.style.setProperty("display", "block");
      }
    });
  });
}

newsletterForms();