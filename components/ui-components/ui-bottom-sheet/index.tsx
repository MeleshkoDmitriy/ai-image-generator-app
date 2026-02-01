import { RefObject, useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface UIBottomSheetProps {
  ref: RefObject<BottomSheetMethods | null>;
  children: React.ReactNode;
}

export const UIBottomSheet = ({ children, ref }: UIBottomSheetProps) => {
  // const handleSnapPress = useCallback((index: number) => {
  //   bottomSheetRef.current?.snapToIndex(index);
  // }, []);
  // const handleClosePress = useCallback(() => {
  //   bottomSheetRef.current?.close();
  // }, []);

  const snapPoints = useMemo(() => ["50%", "75%", "100%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={1} pressBehavior={"close"} opacity={0.25} />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing={true}
      backdropComponent={renderBackdrop}
      // backgroundComponent={}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
};
