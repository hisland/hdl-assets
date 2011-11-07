package no.ns.hdl;

import java.util.Date;

/**
 * 
 * 提供公历转农历的基本计算
 * <pre>
 * TIPS:
 * 农历每月天数为29或30
 * 农历每年可有闰月或没有, 闰月天数为29或30
 * </pre> 
 * 
 * @author hedingliang
 * @version 1
 * 
 */
public class Lunar {
	/** 基础计算年 */
	public static final int BASE_YEAR = 1979;
	
	/** 每天的秒数 */
	public static final int SECONDS_PER_DAY = 86400;
	
	/** 地球公转一周的时间 */
	public static final int SECONDS_PER_REVOLUTION = 31556925;
	
	/** 1980年元旦 */
	public static final int SECONDS_AT_1980 = 315504000;
	
	/** 1979年春节 */
	public static final int SECONDS_AT_1979_SPRING_FESTIVAL = 286300800;
	
	/** 1980年小寒 */
	public static final int SECONDS_AT_1980_LESSER_COLD = 315980934;
	
	/** 农历月大写 */
	public static final String[] MONTH = { "正", "二", "三", "四", "五", "六", "七",
			"八", "九", "十", "冬", "腊" };
	
	/** 农历日期大写 */
	public static final String[] DATE = { "一", "二", "三", "四", "五", "六", "七",
			"八", "九", "十" };
	
	/** 农历日期前缀 */
	public static final String[] DAY_PREFIX = { "初", "十", "廿"};
	
	/** 24节气名 */
	public static final String[] SOLAR_TERMS = { "小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
			"清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露",
			"秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至" };
	
	/** 以小寒为起点，各节气的时间点 */
	public static final int[] SOLAR_TERMS_SPLIT = { 0, 21208, 42467, 63836, 85337,
			107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343,
			285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795,
			462224, 483532, 504758 };

	/*************************************************************************************************************
												1979－2100年的农历资料
												
			说明：0x表示16进制。
				16进制数的前3位表示该年月份的长度，化为2进制后1表示大月（30天），0表示小月（29天）。
				16进制数的第4位表示该年为闰几月，如为0表示该年为平年。
				16进制的第5位化为2进制后第1位表示该年闰月的大小；后3位表示该年小月的数量，用以计算该年的天数，
				增加这一参数的目的是为了减少计算的次数，这样就不用逐月相加了。
	**************************************************************************************************************/
	public static final int[] LUNAR_INFO = { 
			0x95a6e,0x95b05,//1979-1980
			0x49b06,0xa9745,0xa4b06,0xb27a5,0x6a506,0x6d406,0xaf465,0xab605,0x95705,0x4af55,//1981-1990
			0x49706,0x64b06,0x74a36,0xea505,0x6b585,0x5ac06,0xab605,0x96d55,0x92e06,0xc9606,//1991-2000
			0xd9545,0xd4a06,0xda505,0x75525,0x56a06,0xabb74,0x25d06,0x92d06,0xcab55,0xa9506,//2001-2010
			0xb4a06,0xbaa45,0xad505,0x55d95,0x4ba06,0xa5b05,0x5176e,0x52b06,0xa9306,0x79545,//2011-2020
			0x6aa06,0xad505,0x5b525,0x4b606,0xa6e65,0xa4e06,0xd2606,0xea655,0xd5305,0x5aa06,//2021-2030
			0x76a35,0x96d05,0x4afb5,0x4ad06,0xa4d06,0xd0b6e,0xd2506,0xd5206,0xdd455,0xb5a05,//2031-2040
			0x56d05,0x55b25,0x49b06,0xa5775,0xa4b06,0xaa506,0xb255e,0x6d206,0xada05,0x4b63e,//2041-2050
			0x93705,0x49f85,0x49706,0x64b06,0x68a6f,0xea505,0x6b206,0xa6c4e,0xaae05,0x92e06,//2051-2060
			0xd2e35,0xc9606,0xd5575,0xd4a06,0xda505,0x5d555,0x56a06,0xa6d05,0x55d45,0x52d06,//2061-2070
			0xa9b85,0xa9506,0xb4a06,0xb6a65,0xad505,0x55a06,0xaba45,0xa5b05,0x52b06,0xb2735,//2071-2080
			0x69306,0x73375,0x6aa06,0xad505,0x4b55e,0x4b606,0xa5705,0x54e46,0xd2606,0xe9685,//2081-2090
			0xd5206,0xdaa05,0x6aa6e,0x56d05,0x4ae06,0xa9d45,0xa4d06,0xd1506,0xf2525,0xd5206};//2091-2100


	/**
	 * 12*30=360 - 小月少掉的天数 + 闰月天数
	 * @param year
	 * @return int 农历year年的总天数
	 */
	public static int daysOfYear(int year){
		return 360 - (LUNAR_INFO[year - BASE_YEAR] & 0x7) + daysOfLeapMonth(year);
	}
	
	/**
	 * @param year
	 * @param month
	 * @return int 农历year年,month月的天数,不含闰月
	 */
	public static int daysOfMonth(int year, int month) {
		return (LUNAR_INFO[year - BASE_YEAR] & 0x100000 >> month) != 0 ? 30 : 29;
	}
	
	/**
	 * @param year
	 * @return int 农历year年闰月的天数,没闰返回0
	 */
	public static int daysOfLeapMonth(int year){
		if (LeapMonthOfYear(year) > 0) {
			return (LUNAR_INFO[year - BASE_YEAR] & 0x8) != 0 ? 30 : 29;
		}else{
			return 0;
		}
	}
	
	/**
	 * @param year
	 * @return int 农历year年闰哪个月:1-12,没闰返回0
	 */
	public static int LeapMonthOfYear(int year) {
		return (LUNAR_INFO[year - BASE_YEAR] & 0xf0) >> 4;
	}

	/** 生肖列表 */
	public static final String[] YEAR_ANIMAL = { "鼠", "牛", "虎", "兔", "龙", "蛇",
			"马", "羊", "猴", "鸡", "狗", "猪" };
	
	/**
	 * 网上找的简便方法,(年-4)%12得[鼠,牛,虎,兔...]中对应的index
	 * @param year
	 * @return String 年所对应的生肖
	 */
	public static String getAnimal(int year) {
		return YEAR_ANIMAL[(year-4) % 12];
	}

	private int intYear;
	private int intMonth;
	private int intDate;
	
	public Lunar() {
	}
	public Lunar(Date d) {
		parseLunar(d);
	}

	public void parseLunar(Date d) {
		try {
			parseLunar((long) d.getTime()/1000);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public void parseLunar(long secondsTo) throws Exception {
		intYear = BASE_YEAR;
		long secondsInc = SECONDS_AT_1979_SPRING_FESTIVAL;
		for (; secondsInc <= secondsTo; intYear++) {
			if (intYear > 2100) {
				throw new Exception("年份数据截止到2100,该日期已经超过了!");
			}
			secondsInc += daysOfYear(intYear)*SECONDS_PER_DAY;
		}
		
		//得到农历年
		intYear--;

		//当年超过的秒数
		long secondsInYear = secondsTo + daysOfYear(intYear)*SECONDS_PER_DAY - secondsInc;

		//当年超过的天数, 需+1
		int daysInYear = (int) Math.ceil(secondsInYear/SECONDS_PER_DAY) + 1;

		boolean notEnd = true;
		int daysInc = 0;
		intMonth = 1;
		for (; notEnd; intMonth++) {
			//增加当月的天数
			daysInc += daysOfMonth(intYear, intMonth);
			
			//每次都要检查天数是否已够
			if ( daysInYear <= daysInc ) {
				notEnd = false;
			}
			//不够需要检查不是闰月,并加上相应天数
			else if( intMonth == LeapMonthOfYear(intYear) ) {
				daysInc += daysOfLeapMonth(intYear);
				
				//加了之后还要检查是否已够
				if ( daysInYear <= daysInc ) {
					notEnd = false;
					
					//闰月month设置为0作为标识
					intMonth = 0;
				}
			}
		}

		//得到农历月, 0表示闰月
		if (intMonth != 0) {
			intMonth--;
		}

		//这里是当月剩下的天数,且为负数,加上当月天数即得当月当时的日期
		intDate = daysInYear - daysInc;
		if ( intMonth == 0 ) {
			intDate += daysOfLeapMonth(intYear);
		} else {
			intDate += daysOfMonth(intYear, intMonth);
		}
	}

	public String getAnimal() {
		return getAnimal(intYear);
	}
	public String getYear() {
		return getAnimal() + "年";
	}
	public String getMonth() {
		if (intMonth == 0) {
			return "闰" + MONTH[LeapMonthOfYear(intYear) - 1] + "月";
		} else {
			return MONTH[intMonth - 1] + "月";
		}
	}
	
	public String getDate() {
		if (intDate < 11) {
			return DAY_PREFIX[0] + DATE[intDate - 1];
		} else if (intDate < 20) {
			return DAY_PREFIX[1] + DATE[intDate - 11];
		} else if (intDate == 20) {
			return DAY_PREFIX[2] + "十";
		} else if (intDate < 30) {
			return DAY_PREFIX[2] + DATE[intDate - 21];
		} else {
			return "三十";
		}
	}
	
	public String toString() {
		return getYear() + getMonth() + getDate();
	}
	
	public Lunar setDate(Date d) {
		parseLunar(d);
		return this;
	}
	
	public int getIntYear() {
		return intYear;
	}
	public int getIntMonth() {
		return intMonth;
	}
	public int getIntDate() {
		return intDate;
	}

	public static void main(String[] args) {
		Lunar l = new Lunar();
	}
}
