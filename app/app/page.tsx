// app/app/page.tsx
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { cookieName, verifySession } from "../../lib/session";
import { makeToolJetToken } from "../../lib/tooljetToken";

export default function AppPage() {
  // 1) Check session cookie
  const jar = cookies();
  const sid = jar.get(cookieName)?.value;
  if (!sid) redirect("/login");

  let email: string;
  try {
    const payload = verifySession(sid);
    email = payload.sub; // we used the email as the userId for the demo
  } catch {
    redirect("/login");
  }

  // 2) Mint short-lived token for ToolJet
  const user = { id: email, email, role: "end_user" };
  const token = makeToolJetToken(user);

  // 3) Build the iframe URL
  const appUrl = process.env.TOOLJET_APP_URL!;
  const src = `${appUrl}?token=${encodeURIComponent(token)}&uid=${encodeURIComponent(user.id)}`;

  return (
    <main style={{ height: "100vh", margin: 0 }}>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #e5e5e5", fontFamily: "system-ui" }}>
        Logged in as <strong>{email}</strong>
        <form method="post" action="/api/logout" style={{ display: "inline", marginLeft: 12 }}>
          <button>Log out</button>
        </form>
      </div>

      <iframe
        title="ToolJet Embedded App"
        src={src}
        style={{ width: "100%", height: "calc(100vh - 44px)", border: 0 }}
        allow="clipboard-read; clipboard-write"
      />
    </main>
  );
}
