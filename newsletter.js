function newsletterForms() {
    const forms = document.querySelectorAll('[data-form="klaviyo"]');
    const apiKey = "T6wHNs";
    const listId = "TVZZ7n";
  
    forms.forEach((form) => {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
  
        const input = form.querySelector('input[type="email"]');
        const success = form.querySelector(".w-form-done");
        const error = form.querySelector(".w-form-fail");
  
        if (!input) return;
        const email = input.value.trim();
  
        if (success) success.style.display = "none";
        if (error) error.style.display = "none";
  
        try {
          const res = await fetch(
            `https://a.klaviyo.com/api/v2/list/${listId}/subscribe`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                api_key: apiKey,
                profiles: [{ email }],
              }),
            }
          );
  
          if (res.ok) {
            input.value = "";
            if (form) form.style.display = "none";
            if (success) success.style.display = "block";
          } else {
            if (error) error.style.display = "block";
          }
        } catch (err) {
          if (error) error.style.display = "block";
          console.error("Subscribe error:", err);
        }
      });
    });
  }
  
  newsletterForms();  