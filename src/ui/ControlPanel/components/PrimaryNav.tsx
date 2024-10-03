import { getLink, paths } from "@lib/utils/router";
import PrimaryNavLink from "./PrimaryNavLink";

export default function PrimaryNav() {
  const items = Object.entries(paths.controlPanel).filter((path) => {
    return path[1].primaryNav === true;
  });

  return (
    <div className="py-6 border-y border-slate-500">
      <div className="mb-4 text-lg font-semibold">Navigation</div>
      <nav aria-label="Primary Navigation">
        <ul className="grid gap-2">
          {items.map((item, index) => {
            const link = getLink(`cp.${item[0]}`, item[1].defaultParams);
            const Icon = item[1].primaryNavIcon;

            return (
              <li key={index}>
                <PrimaryNavLink
                  href={link}
                  title={item[1].title}
                  Icon={!!Icon && <Icon />}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
