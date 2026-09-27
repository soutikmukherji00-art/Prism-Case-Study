/**
 * THE LAYER REGISTRY — the only place a component becomes usable in a story file.
 *
 * To add a new kind of layer:
 *   1. write the component (props = plain data),
 *   2. register it here with its entrance duration and default area,
 *   3. use it in a panel: { kind: 'yourKind', ...props }. Types follow automatically.
 */
import { defineLayer, type LayerDef } from '../engine/registry';
import { Callout, calloutDuration, type CalloutProps } from '../components/callout/Callout';
import { Character, type CharacterProps } from '../components/character/Character';
import { BMapChart, bmapDuration, type BMapChartProps } from '../components/charts/BMapChart';
import { DayBar, dayBarDuration, Metric, type DayBarProps, type MetricProps } from '../components/charts/Charts';
import { Dialogue, dialogueDuration, type DialogueProps } from '../components/dialogue/Dialogue';
import { Dim, Footage, Scene, type DimProps, type FootageProps, type SceneProps } from '../components/scene/Scene';
import { Group, groupDuration, Split, splitDuration, type GroupProps, type SplitProps } from '../components/scene/Split';
import { TypePanel, typeDuration, type TypePanelProps } from '../components/typographic/TypePanel';
import { AppWindow, type AppWindowProps } from '../components/ui/Window';
import {
  CursorButton, cursorButtonDuration, Field, fieldDuration, Menu, Modal, ShimmerForm, shimmerDuration, Stepper, stepperDuration, SubmitBar,
  type CursorButtonProps, type FieldProps, type MenuProps, type ModalProps, type ShimmerFormProps, type StepperProps, type SubmitBarProps,
} from '../components/ui/forms';
import {
  ChatInquiry, chatInquiryDuration, Fragments, fragmentsDuration, Nudge, PhoneChat, phoneChatDuration,
  type ChatInquiryProps, type FragmentsProps, type NudgeProps, type PhoneChatProps,
} from '../components/ui/chat';
import {
  Cart, Clock, Counter, counterDuration, List, listDuration, Search, searchDuration, StatusCard, statusDuration, Summary, summaryDuration,
  type CartProps, type ClockProps, type CounterProps, type ListProps, type SearchProps, type StatusCardProps, type SummaryProps,
} from '../components/ui/lists';
import {
  DetectiveBoard, DeviceCompare, Flow, flowDuration, Gallery, IconMark, PersonaToggle, ScreensRow, screensRowDuration, Whiteboard, whiteboardDuration,
  type DetectiveBoardProps, type DeviceCompareProps, type FlowProps, type GalleryProps, type IconMarkProps, type PersonaToggleProps, type ScreensRowProps, type WhiteboardProps,
} from '../components/ui/boards';

/**
 * Props of every layer kind. An explicit interface (rather than inferring from
 * `layers`) lets container layers like `split` hold other layers recursively.
 */
export interface LayerProps {
  scene: SceneProps;
  character: CharacterProps;
  dialogue: DialogueProps;
  callout: CalloutProps;
  type: TypePanelProps;
  footage: FootageProps;
  dim: DimProps;
  split: SplitProps;
  group: GroupProps;
  bmap: BMapChartProps;
  dayBar: DayBarProps;
  metric: MetricProps;
  appWindow: AppWindowProps;
  field: FieldProps;
  stepper: StepperProps;
  menu: MenuProps;
  modal: ModalProps;
  submitBar: SubmitBarProps;
  cursorButton: CursorButtonProps;
  shimmerForm: ShimmerFormProps;
  phoneChat: PhoneChatProps;
  fragments: FragmentsProps;
  chatInquiry: ChatInquiryProps;
  nudge: NudgeProps;
  list: ListProps;
  search: SearchProps;
  counter: CounterProps;
  cart: CartProps;
  status: StatusCardProps;
  clock: ClockProps;
  summary: SummaryProps;
  whiteboard: WhiteboardProps;
  detectiveBoard: DetectiveBoardProps;
  flow: FlowProps;
  screensRow: ScreensRowProps;
  gallery: GalleryProps;
  deviceCompare: DeviceCompareProps;
  personaToggle: PersonaToggleProps;
  iconMark: IconMarkProps;
}

export const layers: { [K in keyof LayerProps]: LayerDef<LayerProps[K]> } = {
  /* staging */
  scene: defineLayer(Scene, { duration: 0, area: 'full' }),
  character: defineLayer(Character, { duration: 0.45, area: 'full' }),
  dialogue: defineLayer(Dialogue, { duration: dialogueDuration, area: 'top' }),
  callout: defineLayer(Callout, { duration: calloutDuration, area: 'center' }),
  type: defineLayer(TypePanel, { duration: typeDuration, area: 'full' }),
  footage: defineLayer(Footage, { duration: 0.6, area: 'full' }),
  dim: defineLayer(Dim, { duration: 0.3, area: 'full' }),
  split: defineLayer(Split, { duration: splitDuration, area: 'full' }),
  group: defineLayer(Group, { duration: groupDuration, area: 'full' }),

  /* charts */
  bmap: defineLayer(BMapChart, { duration: bmapDuration, area: 'center' }),
  dayBar: defineLayer(DayBar, { duration: dayBarDuration, area: 'centerWide' }),
  metric: defineLayer(Metric, { duration: 1.3, area: 'center' }),

  /* product UI (wireframe) */
  appWindow: defineLayer(AppWindow, { duration: 1.2, area: 'centerWide' }),
  field: defineLayer(Field, { duration: fieldDuration, area: 'leftPad' }),
  stepper: defineLayer(Stepper, { duration: stepperDuration, area: 'leftPad' }),
  menu: defineLayer(Menu, { duration: 1.2, area: 'leftPad' }),
  modal: defineLayer(Modal, { duration: 0.9, area: 'leftPad' }),
  submitBar: defineLayer(SubmitBar, { duration: 0.9, area: 'leftPad' }),
  cursorButton: defineLayer(CursorButton, { duration: cursorButtonDuration, area: 'center' }),
  shimmerForm: defineLayer(ShimmerForm, { duration: shimmerDuration, area: 'centerWide' }),
  phoneChat: defineLayer(PhoneChat, { duration: phoneChatDuration, area: 'center' }),
  fragments: defineLayer(Fragments, { duration: fragmentsDuration, area: 'leftPad' }),
  chatInquiry: defineLayer(ChatInquiry, { duration: chatInquiryDuration, area: 'centerWide' }),
  nudge: defineLayer(Nudge, { duration: 0.7, area: 'upper' }),
  list: defineLayer(List, { duration: listDuration, area: 'leftPad' }),
  search: defineLayer(Search, { duration: searchDuration, area: 'leftPad' }),
  counter: defineLayer(Counter, { duration: counterDuration, area: 'center' }),
  cart: defineLayer(Cart, { duration: 0.9, area: 'leftPad' }),
  status: defineLayer(StatusCard, { duration: statusDuration, area: 'leftPad' }),
  clock: defineLayer(Clock, { duration: 1.0, area: 'leftPad' }),
  summary: defineLayer(Summary, { duration: summaryDuration, area: 'leftPad' }),

  /* boards & diagrams */
  whiteboard: defineLayer(Whiteboard, { duration: whiteboardDuration, area: 'centerWide' }),
  detectiveBoard: defineLayer(DetectiveBoard, { duration: 1.4, area: 'centerWide' }),
  flow: defineLayer(Flow, { duration: flowDuration, area: 'centerWide' }),
  screensRow: defineLayer(ScreensRow, { duration: screensRowDuration, area: 'centerWide' }),
  gallery: defineLayer(Gallery, { duration: 1.0, area: 'centerWide' }),
  deviceCompare: defineLayer(DeviceCompare, { duration: 0.9, area: 'rightPad' }),
  personaToggle: defineLayer(PersonaToggle, { duration: 0.7, area: 'centerWide' }),
  iconMark: defineLayer(IconMark, { duration: 0.6, area: 'center' }),
};

