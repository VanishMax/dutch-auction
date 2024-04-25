import type { FC } from 'react';
import {Label, Slider as AriaSlider, SliderProps as AriaSliderProps, SliderOutput, SliderThumb, SliderTrack} from 'react-aria-components';
import clsx from 'clsx';

export interface SliderProps extends AriaSliderProps {
  label: string;
}

export const Slider: FC<SliderProps> = ({ label, className, ...props }) => {
  const renderDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes ? ` ${remainingMinutes}m` : ''}`;
  };

  return (
    <AriaSlider {...props} className={clsx('flex flex-col gap-1', className)}>
      <div className="flex w-full justify-between items-center">
        <Label className="text-gray-200 text-sm">{label}</Label>
        <SliderOutput>
          {(output) => (
            <span className="text-gray-200 text-sm">{renderDuration(output.state.values?.[0])}</span>
          )}
        </SliderOutput>
      </div>

      <SliderTrack className="relative w-full h-[6px] rounded-md bg-black/50">
        <SliderThumb className="w-4 h-4 rounded-full bg-gray-400 border border-gray-900 top-1/2 cursor-pointer" />
      </SliderTrack>
    </AriaSlider>
  );
};
