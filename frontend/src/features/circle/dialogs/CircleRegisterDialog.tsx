import SlideDlialog, {
  SlideDialogProps,
} from "@/components/dialog/SlideDialog";
import { useEffect, useState } from "react";
import SelectCirclePanel from "./panels/SelectCirclePanel";
import { Circle, RegisterRequest } from "@/models/Circle";
import WriteFormPanel from "./panels/WriteFormPanel";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import CompletePanel from "./panels/CompletePanel";
import { useMutation, useQueryClient } from "react-query";
import api from "@/api";

interface CircleRegisterDialogProps
  extends Omit<SlideDialogProps, "children"> {}

export default function CircleRegisterDialog({
  ...args
}: CircleRegisterDialogProps) {
  const queryClient = useQueryClient();

  /* Server Side */
  const { mutate: registerCircle, isLoading } = useMutation(
    (req: RegisterRequest) => {
      return api.circle.registerToCircle(selectedCircle.id, req);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchMyMemberedCircle"]);
        queryClient.invalidateQueries(["fetchMyRegister"]);
      },
    }
  );

  /* Properties */
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedCircle, setSelectedCircle] = useState<Circle>(null);
  const [clearTrigger, setClearTrigger] = useState(false);

  /* LifeCycle & Hooks */
  useEffect(() => {
    if (args.opened === false) setCurrentStage(0);
  }, [args.opened]);

  /* Functions */
  const getPanelView = () => {
    if (currentStage === 0)
      return (
        <SelectCirclePanel onCircleSelect={(it) => handleSelectCircle(it)} />
      );
    else if (currentStage === 1)
      return (
        <WriteFormPanel
          onSubmit={(str) => {
            handleSubmit({ message: str });
          }}
          onBack={() => setCurrentStage(0)}
          clearTrigger={clearTrigger}
        />
      );
    else if (currentStage === 2)
      return (
        <CompletePanel
          circle={selectedCircle}
          isLoading={isLoading}
          onClose={() => args.onClosed()}
        />
      );
    else return <div />;
  };

  const handleSelectCircle = (circle: Circle) => {
    setCurrentStage(1);
    setSelectedCircle(circle);
  };

  const handleSubmit = (req: RegisterRequest) => {
    registerCircle(req);
    setCurrentStage(2);
  };

  const clearTextBox = () => {
    setClearTrigger(true);
    setClearTrigger(false);
  };
  return (
    <SlideDlialog {...args}>
      <div className="md:px-[50px] md:pt-[25px]">
        <SwitchTransition mode={"out-in"}>
          <CSSTransition key={currentStage} classNames={"scale"} timeout={300}>
            {getPanelView()}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </SlideDlialog>
  );
}
