import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
// import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';
import BarChart from '../../chart-types/BarChart';
import { formatNum } from '../../../utils';
import ChartContainer from '../../../layouts/ChartContainer';
import useRequest from '../../../hooks/useRequest';
import API from '../../../api';

const chartName = 'Fee ranges';
const barName = chartName;
const yAxisWidth = 40;
const yAxisTickCount = 10;
const xAxisTickCount = 10;

// const CustomTooltip = ({ active, payload, label }) => {
//   // TODO: Test with null/undefined
// if (!props.active || !props.payload[0]) {
//   return null;
// }
//
// const newPayload = [
//   ...props.payload[0].payload.validators.map((validator) => ({
//     name: validator.validator,
//     value: formatPercentValue(formatNum(validator.fee * 100)),
//   })),
//   ...props.payload,
// ];
//
// return <DefaultTooltipContent {...props} payload={newPayload} />;
//
//   if (active && payload && payload.length) {
//     const newPayload = payload[0].payload.validators.map((validator) => ({
//       name: validator.validator,
//       value: formatPercentValue(formatNum(validator.fee * 100)),
//     }));
//
//     return (
//       <div
//         style={{
//           margin: '0px',
//           padding: '10px',
//           backgroundColor: 'rgb(255, 255, 255)',
//           border: '1px solid rgb(204, 204, 204)',
//           whiteSpace: 'nowrap',
//         }}
//       >
//         {newPayload.map((item, i) => {
//           if (item) {
//             return (
//               <p
//                 /* eslint-disable-next-line react/no-array-index-key */
//                 key={i}
//                 className="label"
//               >{`${item.name} : ${item.value}`}</p>
//             );
//           }
//         })}
//       </div>
//     );
//   }
//
//   return null;
// };

const FeeRanges = () => {
  const theme = useContext(ThemeContext);
  const { resp, isLoading } = useRequest(API.getFeeRanges);

  const feeRanges = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.map((el) => ({
      // name: formatNum(el.to * 100),
      name: `${formatNum(el.from * 100)}-${formatNum(el.to * 100)}%`,
      dataPiece: el.validators ? el.validators.length : 0,
      validators: el.validators ? el.validators : [],
    }));
  }, [resp]);

  return (
    <ChartContainer
      title={chartName}
      chart={
        <BarChart
          isLoading={isLoading}
          data={feeRanges}
          yAxisWidth={yAxisWidth}
          yAxisTickCount={yAxisTickCount}
          yAxisLabelsFormatter={formatNum}
          yAxisDomain={['dataMin', 'dataMax']}
          xAxisTickInterval="preserveStartEnd"
          xAxisTickCount={xAxisTickCount}
          tooltipFormatter={formatNum}
          // customTooltip={<CustomTooltip />}
          barName={barName}
          barColor={theme.burgundy}
        />
      }
    />
  );
};

export default FeeRanges;
