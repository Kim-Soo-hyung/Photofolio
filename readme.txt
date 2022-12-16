회사 퇴사자 관리게시판 만들기 
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">


<mapper namespace="ErpDeceasedsMapper">
	<!-- 퇴사자직원 - 목록 조회 -->
	<select id="selectDeceasedList" parameterType="hashmap"
		resultType="com.erp.dev.deceased.vo.DeceasedVo">
			 <![CDATA[
			 select
	        	  deceSq
				, deceNM1
				, deceAs1
				, deceDp
				, decePh
				, deceCn
				, deceNc
				, deceAddr
				, deceSon
			FROM est_eep_db.TB_EEP_DECEASED
			
        ]]>
		<where>
			<if test="deceSq_ARR != NULL">
				AND deceSq IN
				<foreach collection="deceSq_ARR" item="deceSq" open="("
					close=")" separator=",">
					#{deceSq}
				</foreach>
			</if>
			<if test="deceNM1 != NULL">
				AND deceNM1 LIKE CONCAT('%', #{deceNM1}, '%')
			</if>
			<if test="deceAs1 != NULL">
				AND deceAs1 LIKE CONCAT('%', #{deceAs1}, '%')
			</if>
			<if test="deceSon != NULL">
				AND deceSon LIKE CONCAT('%', #{deceSon}, '%')
			</if>
		</where>
	</select>

	<select id="selectDeceasedOne" parameterType="_long"
		resultType="com.erp.dev.deceased.vo.DeceasedVo">
		<![CDATA[
			SELECT * FROM est_eep_db.TB_EEP_DECEASED WHERE deceSq = #{deceSq}
		]]>
	</select>


	<insert id="insertDeceased"
		parameterType="com.erp.dev.deceased.vo.DeceasedVo">
		<![CDATA[
			INSERT INTO est_eep_db.TB_EEP_DECEASED (
				  deceSq
				, deceNM1
				, deceAs1
				, deceDp
				, decePh
				, deceCn
				, deceNc
				, deceAddr
				, deceSon
			) VALUES (
				  #{deceSq}
				, #{deceNM1}
				, #{deceAs1}
				, #{deceDp}
				, #{decePh}
				, #{deceCn}
				, #{deceNc}
				, #{deceAddr}
				, #{deceSon}
			)
		]]>
	</insert>

	<delete id="deleteDeceased" parameterType="_long">
		<![CDATA[
			DELETE FROM est_eep_db.TB_EEP_DECEASED
			WHERE deceSq = #{deceSq}
		]]>
	</delete>

	<update id="updateDeceased" parameterType="com.erp.dev.deceased.vo.DeceasedVo">
		<![CDATA[
			UPDATE est_eep_db.TB_EEP_DECEASED SET
				  deceNM1		=		#{deceNM1}
				, deceAs1		=		#{deceAs1}
				, deceDp		=		#{deceDp}
				, decePh		=		#{decePh}
				, deceCn		=		#{deceCn}
				, deceNc		=		#{deceNc}
				, deceAddr  	=  		#{deceAddr}
				, deceSon 		=  		#{deceSon}
				
			WHERE deceSq = #{deceSq}
		]]>
	</update>



</mapper>	
