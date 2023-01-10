# Photofolio
mapper

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="back">
	
	<select id="selectbackList" parameterType="hashmap" resultType="com.back.vo.BackVo">
		<![CDATA[
			select 
				   Pro_Sq
				  ,Pro_Sqq
				  ,Pro_Nm
				  ,Pro_Typ
				  ,Pro_Addr
			from 
				est_eep_db.tb_eep_back
		]]>
		<where>
			<if test="Pro_Sq_ARR != NULL">
		    	AND Pro_Sq IN
		    	<foreach collection="Pro_Sq_ARR" item="proSq" open="(" close=")" separator=",">
					#{proSq}
				</foreach>
		    </if>
			<if test="Pro_Nm != NULL">
		    	AND Pro_Nm LIKE CONCAT('%', #{Pro_Nm}, '%')
		    </if>
			<if test="Pro_Typ != NULL">
		    	AND Pro_Typ LIKE CONCAT('%', #{Pro_Typ}, '%')
		    </if>
		    <if test="Pro_Addr != NULL">
		    	AND Pro_Addr LIKE CONCAT('%', #{Pro_Addr}, '%')
		    </if>
		</where>
	</select>

 <select id="selectbackOne" parameterType="_long" resultType="com.back.vo.BackVo">
		<![CDATA[
			select 
				   Pro_Sq
				  ,Pro_Sqq
				  ,Pro_Nm
				  ,Pro_Typ
				  ,Pro_Addr
				  
			from est_eep_db.tb_eep_back where Pro_Sq =#{proSq}
		]]>
	</select>  
	
	<update id="updateBack" parameterType="hashmap">
			<![CDATA[
				UPDATE EST_EEP_DB.TB_EEP_BACK SET
					PRO_SQ    = #{proSq}
				   ,PRO_SQQ	  = #{proSqq}
				   ,PRO_NM	  = #{proNm}
				   ,PRO_TYP	  = #{proTyp}
				   ,PRO_ADDR  = #{proAddr}
			
				WHERE PRO_SQ=#{proSq}
			
			]]>
		
	</update>

	<insert id="insertBack" parameterType="com.back.vo.BackVo">
		<![CDATA[
			INSERT INTO  est_eep_db.tb_eep_back (
				   PRO_SQ
				  ,PRO_SQQ
				  ,PRO_NM
				  ,PRO_TYP
				  ,PRO_ADDR
			) VALUES (
				  #{proSq}
				, #{proSqq}
				, #{proNm}
				, #{proTyp}
				, #{proAddr}
				
			)
		]]>
	</insert>
	<delete id="deleteBack" parameterType="_long">
		<![CDATA[
			DELETE FROM  est_eep_db.tb_eep_back
			WHERE PRO_SQ = #{proSq}
		]]>
	</delete>

</mapper>


