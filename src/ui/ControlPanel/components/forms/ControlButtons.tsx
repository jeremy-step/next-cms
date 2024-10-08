import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import BaseButton from "../BaseButton";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "../LoadingSpinner";

interface ControlsProps extends React.HTMLAttributes<HTMLElement> {
  type?: "create" | "edit";
  label?: string;
  cancelLink?: string;
  form: React.RefObject<HTMLFormElement>;
  controls?: Array<"primary" | "cancel" | "delete">;
  onDelete?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  setState: CallableFunction;
}

export default function ControlButtons({
  type = "create",
  label = "",
  setState,
  cancelLink = undefined,
  form,
  className,
  controls = ["primary", "cancel", "delete"],
  onDelete = undefined,
  ...rest
}: ControlsProps) {
  const formStatus = useFormStatus();

  return (
    <div
      className={twMerge(clsx("flex gap-3 justify-between", className))}
      {...rest}
    >
      <div className="flex gap-3 items-center">
        {controls.includes("primary") && (
          <>
            <BaseButton
              mode="success"
              disabled={formStatus.pending}
              className="min-w-24"
            >
              {type === "create" ? "Create" : "Edit"} {label}
            </BaseButton>

            {formStatus.pending && (
              <LoadingSpinner
                label={`${type === "create" ? "Creating" : "Editing"} ${label}`}
              />
            )}
          </>
        )}
      </div>

      <div className="flex gap-3">
        {controls.includes("cancel") && (
          <BaseButton
            mode="warning"
            as={cancelLink === undefined ? "button" : "Link"}
            href={cancelLink}
            title={`Cancel ${
              type === "create" ? "Creating" : "Editing"
            } ${label}`}
            aria-disabled={formStatus.pending ? true : undefined}
            onClick={
              cancelLink === undefined
                ? () => {
                    setState({});

                    form?.current?.reset();
                  }
                : undefined
            }
            type="button"
          >
            Cancel
          </BaseButton>
        )}

        {type === "edit" && controls.includes("delete") && (
          <BaseButton
            mode="alert"
            disabled={formStatus.pending}
            type="button"
            onClick={onDelete}
          >
            Delete {label}
          </BaseButton>
        )}
      </div>
    </div>
  );
}
