//K线周期类型
enum KLineType
{
	KLINE_1MINUTE	= 1;
	KLINE_DAY		= 2;
	KLINE_WEEK		= 3;
	KLINE_MONTH		= 4;
	KLINE_YEAR		= 5;
	KLINE_5MINUTE	= 6;
	KLINE_15MINUTE	= 7;
	KLINE_30MINUTE	= 8;
	KLINE_60MINUTE	= 9;
}


//K线数据类型
enum DataSetType
{
	DATA_SET_TYPE_KLINE = 0;
	DATA_SET_TYPE_SNAPSHOT = 1;
}


//K线请求参数组合类型，参数组合表示K线数据区间。
//指定的开始时间、结束时间的取值范围及对应的返回数据的时间范围约定：
//	开始时间
//		值为0时，返回第一个点，即所有数据的起点；
//		值为-1时，返回错误；
//		其它值（UTC时间戳）时，返回结果列表的第一个点的时间小于等于指定的（UTC时间戳）；
//	结束时间
//		值为-1时，返回最后一个点，即所有数据的结束点；
//		值为0时，返回错误；
//		其它值（UTC时间戳）时，返回结果列表的最后一个点的时间大于等于指定的（UTC时间戳）；
enum DataRangeType
{
	DATA_RANGE_BEGIN_TIME_END_TIME = 1;		//开始时间＋结束时间  
	DATA_RANGE_BEGIN_TIME_ITEM_COUNT = 2;	//开始时间＋数据点个数
	DATA_RANGE_END_TIME_ITEM_COUNT = 3;		//结束时间＋数据点个数
}


//cmd 6154
//K线数据请求
message KLine_Req
{
	required	uint64		security_id = 1;	//股票ID
	required	KLineType	kline_type = 2;		//K线类型
	required	DataSetType	data_set_type = 3;	//数据类型
	
	required    DataRangeType	data_range_type = 4; //K线请求参数组合类型
	optional    uint32 		begin_time = 5;		//开始时间，0：表示所有数据的起点；-1：无效值；其它值：UTC时间戳；
	optional    uint32 		end_time = 6;		//结束时间，-1：表示所有数据的结束点；0：无效值；其它值：UTC时间戳；
	optional    uint32	 	item_count = 7;		//数据点个数，>0：有效值；0:无效值；
}