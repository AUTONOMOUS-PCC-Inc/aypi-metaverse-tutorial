import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"

// 읽기 연습용: GLB 하나를 불러와 애니메이션을 재생하는 가장 짧은 예제.
// 처음에는 화면에 나오지 않는다. experience.jsx 에서 <RobotSample /> 로 불러 보면 된다.
export default function RobotSample(props) {
    const robot = useGLTF("./Robot.glb")
    const { actions, names } = useAnimations(robot.animations, robot.scene)

    useEffect(() => {
        // 이름은 추측하지 말고 먼저 찍어 본다 → Fast Run, Idle, Jump, Run, Walk
        console.log("Robot.glb 애니메이션:", names)

        // 모델은 메시가 여러 개라 메시마다 그림자를 켜야 한다
        robot.scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true
            }
        })

        actions.Walk.play()
        const timer = window.setTimeout(() => {
            actions.Run.play()
            actions.Run.crossFadeFrom(actions.Walk, 1)   // 1초 동안 부드럽게 바뀜
        }, 2000)

        // 정리 함수: 화면에서 떨어질 때 뒷정리를 한다
        return () => {
            window.clearTimeout(timer)
            actions.Walk.stop()
            actions.Run.stop()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [robot])

    return <primitive object={robot.scene} {...props} />
}
