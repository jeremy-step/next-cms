import { getLink } from "@lib/utils/router";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      Front Page
      <br />
      <Link href={getLink("cp.pages/index")}>Control Panel</Link>
    </div>
  );
}
